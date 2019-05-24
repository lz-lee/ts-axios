import  axios from '../../src/index';

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

