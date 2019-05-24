import { AxiosRequestConfig, AxiosResponse } from './types';
import xhr from './xhr';
import { buildURL } from './helpers/url';
import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/header';


function axios(config: AxiosRequestConfig) {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res)
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;

  return buildURL(url, params);
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config;

  return processHeaders(headers, data);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}
export default axios;
