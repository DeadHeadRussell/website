import {isSecure} from '../../services/secure';
import {addListen, getListens} from '../../services/listens';

export default async (req, res) => {
  if (req.method === 'POST') {
    await addListenHandler(req, res);
  } else if (req.method === 'GET') {
    await getListensHandler(req, res);
  } else {
    res.status(404).end();
  }
};

async function addListenHandler(req, res) {
  try {
    if (!req.body || !req.body.album || !req.body.song) {
      res.status(400).json({message: 'Invalid POST body'});
    } else {
      const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      await addListen(req.body.album, req.body.song, userIp);
      res.status(200).json({success: true});
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

async function getListensHandler(req, res) {
  try {
    if (!isSecure(req)) {
      res.status(400).json({message: 'Invalid token'});
    } else {
      if (req.query.group) {
        const listens: any[] = (await getListens()) as any[];
        const groupParser = parseGroupQuery(req.query.group);
        const aggregateParser = parseAggregateQuery(req.query.aggregate);

        if (!groupParser || !aggregateParser) {
          res.status(400).json({message: 'Invalid query params'});
          return;
        }

        const groupedListens = listens.reduce((grouped, listen) => {
          const groupKey = groupParser(listen);
          return {
            ...grouped,
            [groupKey]: aggregateParser(grouped[groupKey], listen)
          };
        }, {});
        res.status(200).json(groupedListens);
      } else {
        const listens = await getListens();
        res.status(200).json(listens);
      }
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

function parseGroupQuery(groupQuery) {
  if (groupQuery === 'ip') {
    return listen => listen['user_ip'];
  } else if (groupQuery === 'song') {
    return listen => listen['album_link'] + ' - ' + listen['song_link'];
  } else if (groupQuery === 'album') {
    return listen => listen['album_link'];
  } else if (groupQuery === 'date') {
    return listen => new Date(listen['date']).toISOString().split('T')[0];
  }
  return null;
}

function parseAggregateQuery(aggregateQuery) {
  if (aggregateQuery === 'count') {
    return (group, listen) => (group || 0) + 1;
  } else if (aggregateQuery === 'concat' || !aggregateQuery) {
    return (group, listen) => (group || []).concat([listen]);
  }
  return null;
}

