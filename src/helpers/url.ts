import { isDate, isObject } from "./util";

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function buildURL(url: string, params?: any) {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach(key => {
    let val = params[key];

    if (val === null || val === undefined) {
      return;
    }

    let values: string[];
    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }

    values.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString();
      } else if (isObject(v)) {
        v = JSON.stringify(v)
      }

      parts.push(`${encode(key)}=${encode(v)}`)
    });
  });

  let $params = parts.join('&');

  if ($params) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    url += (url.includes('?') ? '&' : '?') + $params;
  }

  return url;
}