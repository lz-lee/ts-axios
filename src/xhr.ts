import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types';
import { parseHeaders } from './helpers/header';
import { createError } from './helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url, true);
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return;
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response);
    }

    function handleResponse(res: AxiosResponse): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res);
      } else {
        reject(createError(
          `Request failed with status code ${res.status}`,
          config,
          null,
          request,
          res
        ))
      }
    }
    // 处理网络错误情况
    request.onerror = function handleError() {
      reject(createError(
        'Network error',
        config,
        null,
        request
      ));
    }
    // 超时错误
    request.ontimeout = function handleTimeout() {
      reject(createError(
        `Timeout of ${timeout} ms exceeded `,
        config,
        null,
        request
      ));
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        Reflect.deleteProperty(headers, name);
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });
    request.send(data);
  })
}