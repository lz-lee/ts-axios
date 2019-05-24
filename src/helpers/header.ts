import { isPlainObject } from './util';

export function processHeaders(headers: any, data: any): any {
  formatHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }
  return headers;
}

function formatHeaderName(headers: any, formatName: string): void {
  if (!headers) return;

  Object.keys(headers).forEach(name => {
    if (name !== formatName && name.toUpperCase() === formatName.toUpperCase()) {
      headers[formatName] = headers[name];
      Reflect.deleteProperty(headers, name);
    }
  });
}

export function parseHeaders(headers: string): any {
  let result = Object.create(null);
  if (!headers) return result;

  headers.split('\r\n').forEach(v => {
    let [key, val] = v.split(':');
    key = key.trim().toLowerCase();
    if (!key) return;
    if (val) {
      val = val.trim();
    }
    result[key] = val;
  });
  return result;
}
