export type FilterResponse = {query: string, params: any[]};
export type FilterHandler = (filter: Filter) => FilterResponse;

export interface Filter {
  column: string;
  op: string;
  value?: string;
}

export type FilterHandlerMap = {[column: string]: FilterHandler}

export class InvalidOperatorError extends Error {
  constructor(filter: Filter) {
    super(`Invalid operator ${filter.op} for column ${filter.column}`);
    Object.setPrototypeOf(this, InvalidOperatorError.prototype);
  }
}

export class InvalidColumnError extends Error {
  constructor(filter: Filter) {
    super(`Invalid column ${filter.column}`);
    Object.setPrototypeOf(this, InvalidColumnError.prototype);
  }
}

export class InvalidValueError extends Error {
  constructor(filter: Filter) {
    super(`Invalid value ${filter.value} for column ${filter.column}`);
    Object.setPrototypeOf(this, InvalidValueError.prototype);
  }
}

export function createStringHandler(column: string): FilterHandler {
  return filter => {
    if (!['exists', '!', '=', '!='].includes(filter.op)) {
      throw new InvalidOperatorError(filter);
    }

    if (['!', 'exists'].includes(filter.op)) {
      return createEmptyQuery(column, filter, '');
    }

    if (!filter.value) {
      throw new InvalidValueError(filter);
    }

    return {
      query: `${column} ${filter.op} ?`,
      params: [filter.value]
    };
  };
}

export function createDateHandler(column: string): FilterHandler {
  return filter => {
    if (!['exists', '!', '=', '!=', '<', '<=', '>', '>='].includes(filter.op)) {
      throw new InvalidOperatorError(filter);
    }

    if (['!', 'exists'].includes(filter.op)) {
      return createEmptyQuery(column, filter, '');
    }

    if (!filter.value) {
      throw new InvalidValueError(filter);
    }

    const value = isNaN((filter as any))
      ? (new Date(filter.value)).valueOf()
      : parseInt(filter.value);

    if (Number.isNaN(value)) {
      throw new InvalidValueError(filter);
    }

    return {
      query: `${column} ${filter.op} ?`,
      params: [value]
    };
  };
}

export function createMultiStringHandler(valueSep: string, columns: string[]): FilterHandler {
  return filter => {
    if (!['!', 'exists', '=', '!='].includes(filter.op)) {
      throw new InvalidOperatorError(filter);
    }

    if (['!', 'exists'].includes(filter.op)) {
      return createEmptyQuery(columns.slice(-1)[0], filter, '');
    }

    if (!filter.value) {
      throw new InvalidValueError(filter);
    }

    const params = filter.value.split(valueSep);
    if (columns.length != params.length) {
      throw new InvalidValueError(filter);
    }

    const baseQuery = columns.map(column => `${column} = ?`).join(' AND ');
    const query = filter.op == '!='
      ? `NOT (${baseQuery})`
      : baseQuery;

    return {query, params};
  };
}

export function generateFilterSql(handlerMap: FilterHandlerMap, filters: Filter[], filterSep: 'AND' | 'OR'): FilterResponse {
  if (filters.length == 0) {
    return {query: '', params: []};
  }

  const responses = filters.map(filter => {
    const handler = handlerMap[filter.column];
    if (!handler) {
      throw new InvalidColumnError(filter);
    }
    return handler(filter);
  });

  return {
    query: 'WHERE (' + responses.map(r => r.query).join(`) ${filterSep} (`) + ')',
    params: responses.flatMap(r => r.params)
  };
}

function createEmptyQuery(column: string, filter: Filter, emptyValue?: any): FilterResponse {
  if (emptyValue !== undefined) {
    if (filter.op == '!') {
      return {
        query: `${column} = ? OR ${column} IS NULL`,
        params: [emptyValue]
      };
    } else {
      return {
        query: `${column} != ? AND ${column} IS NOT NULL`,
        params: [emptyValue]
      };
    }
  } else {
    if (filter.op == '!') {
      return {
        query: `${column} IS NULL`,
        params: []
      };
    } else {
      return {
        query: `${column} IS NOT NULL`,
        params: []
      };
    }
  }
}

