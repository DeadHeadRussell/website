import {NextApiRequest, NextApiResponse} from 'next';

import {getListenerId} from '../../services/cookies';
import {Filter} from '../../services/databaseFilters';
import {addListen, getListens, InputListen, Listen, SONG_SEP} from '../../services/listens';
import {isSecure} from '../../services/secure';


type NextQuery = string | string[];

type PartialGrouping<T> = {[valueKey: string]: T[]};
type Grouping<T> = {[valueKey: string]: T[] | GroupingResponse<T>};
type GroupingResponse<T> = T[] | {
  groupKey: string;
  groupValue: Grouping<T>;
};

type Aggregation = {[valueKey: string]: any | AggregationResponse};
type AggregationResponse = any | {
  groupKey: string;
  groupValue: Aggregation;
};

type ParserMap<T> = {[parser: string]: T};
type GroupingParser = (listen: ListenDto) => string;
type AggregationParser = (listens: ListenDto[]) => any;

class RequestError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}

export interface ListenDto {
  id: number;
  category: string;
  album: string;
  song: string;
  date: number;
  referrer: string | null;
  listener: string | null;
  ip: string | null;
};

const GROUP_PARSERS: ParserMap<GroupingParser> = {
  song: listen => listen.song,
  album: listen => listen.album,
  category: listen => listen.category || 'null',
  day: listen => new Date(listen.date).toISOString().split('T')[0],
  month: listen => new Date(listen.date).toISOString().split('-').slice(0, 2).join('-'),
  year: listen => new Date(listen.date).toISOString().split('-')[0],
  referrer: listen => listen.referrer || 'null',
  listener: listen => listen.listener || 'null',
  ip: listen => listen.ip || 'null'
};

const AGGREGATION_PARSERS: ParserMap<AggregationParser> = {
  count: listens => listens.length
  // count keys?
};

// Only length 1 ops allowed
const UNARY_FILTER_OPERATORS: string[] = ['!'];

// Order matters, they are detected from left to right.
const BINARY_FILTER_OPERATORS: string[] = ['!=', '<=', '>=', '=', '<', '>'];


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await addListenHandler(req, res);
  } else if (req.method === 'GET') {
    await getListensHandler(req, res);
  } else {
    res.status(404).end();
  }
};

async function addListenHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body || !req.body.category || !req.body.album || !req.body.song) {
      res.status(400).json({message: 'Invalid POST body'});
    } else {
      const userIpValue = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userIp = Array.isArray(userIpValue) ? userIpValue[0] : userIpValue || '';
      const listenerId = getListenerId(req, res);

      const listen: InputListen = {
        category_link: req.body.category,
        album_link: req.body.album,
        song_link: req.body.song,
        referrer: req.body.referrer,
        listener_ip: userIp,
        listener_id: listenerId
      };
      await addListen(listen);
      res.status(200).json({success: true});
    }
  } catch (err: any) {
    res.status(500).json({error: err.message});
  }
}

async function getListensHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!isSecure(req)) {
      res.status(400).json({message: 'Invalid token'});
    } else {
      const filters = parseFilter(req.query.filter);
      const rawListens: Listen[] = await getListens(filters);
      const listens: ListenDto[] = rawListens.map(listen => ({
        id: listen.id,
        category: listen.category_link,
        album: [listen.category_link, listen.album_link].join(SONG_SEP),
        song: [listen.category_link, listen.album_link, listen.song_link].join(SONG_SEP),
        date: listen.date,
        referrer: listen.referrer,
        listener: listen.listener_id,
        ip: listen.listener_ip
      }));
      const groupedListens = parseGrouping(listens, req.query.group);
      const aggregatedListens = parseAggregation(groupedListens, req.query.aggregation);
      res.status(200).json(aggregatedListens);
    }
  } catch (err: any) {
    const body = {error: err.message};
    const resStatus = err instanceof RequestError ? 400 : 500;
    return res.status(resStatus).json(body);
  }
}

function parseFilter(filterQuery: NextQuery) : Filter[] | null {
  if (filterQuery) {
    const filters = Array.isArray(filterQuery) ? filterQuery : [filterQuery];
    const parsedFilters = filters.map(filter => {
      const unaryOp = UNARY_FILTER_OPERATORS.find(op => filter.trim()[0] == op);
      if (unaryOp) {
        return {
          column: filter.trim().slice(1).trim(),
          op: unaryOp
        };
      }

      const binaryOp = BINARY_FILTER_OPERATORS.find(op => filter.includes(op));
      if (binaryOp) {
        const [column, value] = filter.split(binaryOp);
        return {
          column: column.trim(),
          op: binaryOp,
          value: value.trim()
        };
      }

      if (filter.trim().length > 0) {
        return {
          column: filter.trim(),
          op: 'exists'
        };
      }

      throw new RequestError('Invalid filters');
    });

    return parsedFilters;
  } else {
    return null;
  }
}

function parseGrouping(listens: ListenDto[], groupQuery: NextQuery): GroupingResponse<ListenDto> {
  if (groupQuery) {
    const groupings = Array.isArray(groupQuery) ? groupQuery : [groupQuery];
    const parsers = groupings.map(group => GROUP_PARSERS[group]).filter(p => !!p);

    if (parsers.length != groupings.length) {
      throw new RequestError('Invalid groupings');
    }

    return runParsers(listens, parsers, groupings);
  } else {
    return listens;
  }
}

function runParsers(listens: ListenDto[], parsers: GroupingParser[], groupings: string[]): GroupingResponse<ListenDto> {
  if (parsers.length == 0 || groupings.length == 0) {
    return listens;
  }

  const parser = parsers[0];
  const groupedListens = listens.reduce((grouped, listen) => {
    const valueKey = parser(listen);
    const groupValue = grouped[valueKey] ? grouped[valueKey] : [];
    groupValue.push(listen);
    grouped[valueKey] = groupValue;
    return grouped;
  }, {} as PartialGrouping<ListenDto>);

  const groupKey = groupings[0];
  const groupValue = parsers.length == 1
    ? groupedListens
    : Object.keys(groupedListens).reduce((newGroupedListens, valueKey) => {
      newGroupedListens[valueKey] = runParsers(groupedListens[valueKey], parsers.slice(1), groupings.slice(1));
      return newGroupedListens;
    }, {} as Grouping<ListenDto>);

  return {groupKey, groupValue};
}

function parseAggregation(groupedListens: GroupingResponse<ListenDto>, aggregationQuery: NextQuery): AggregationResponse {
  if (aggregationQuery) {
    if (Array.isArray(aggregationQuery)) {
      throw new RequestError('Only one aggregation allowed');
    }
    const parser = AGGREGATION_PARSERS[aggregationQuery];

    if (!parser) {
      throw new RequestError('Invalid aggregation');
    }

    return runAggregation(groupedListens, parser);
  } else {
    return groupedListens;
  }
}

function runAggregation(groupedListens: GroupingResponse<ListenDto>, parser: AggregationParser): AggregationResponse {
  if (Array.isArray(groupedListens)) {
    return parser(groupedListens);
  } else {
    return {
      groupKey: groupedListens.groupKey,
      groupValue: Object.keys(groupedListens.groupValue).reduce((aggregation, valueKey) => {
        aggregation[valueKey] = runAggregation(groupedListens.groupValue[valueKey], parser);
        return aggregation;
      }, {} as Aggregation)
    };
  }
}

