import axios from '../../src/index';

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['1123', '2234']
  }
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: '1231'
    }
  }
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: new Date()
  }
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$#'
  }
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '123123',
    bar: null
  }
});

axios({
  method: 'post',
  url: '/base/post',
  data: {
    name: 'lee',
    age: 27
  }
});

axios({
  method: 'post',
  url: '/base/post',
  data: {
    name: 'lee',
    age: 27
  },
  headers: {
    'content-type': 'application/json;'
  }
});

const arr = new Int32Array([12, 23]);

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
});

const paramsString = 'q=URLUtils.searchParams&topic=api';
const searchParams = new URLSearchParams(paramsString);

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
});

const res = axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
});

const res2 = axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res);
});