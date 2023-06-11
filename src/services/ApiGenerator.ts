import axios from 'axios';

axios.defaults.timeout = 20000;

export default class ApiGenerator {
  baseUrl: string;
  header: any;
  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
  }

  getApi(path: string, useToken: boolean = false) {
    console.log('full path', `${this.baseUrl}${path}`);
    return axios
      .get(`${this.baseUrl}${path}`, useToken ? {headers: this.header} : {})
      .then(res => res.data)
      .catch(err => throwMessage(err));
  }

  getApiWithParams(path: string, params: any, useToken = false) {
    console.log('full path', `${this.baseUrl}${path}`);
    const paramsString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return axios
      .get(
        `${this.baseUrl}${path}?${paramsString}`,
        useToken ? {headers: this.header} : {},
      )
      .then(res => res.data)
      .catch(err => throwMessage(err));
  }

  postApi(path: string, useToken = false, params: any = {}) {
    console.log('full path', `${this.baseUrl}${path}`);
    return axios
      .post(
        `${this.baseUrl}${path}`,
        params,
        useToken ? {headers: this.header} : {},
      )
      .then(res => res.data)
      .catch(err => throwMessage(err));
  }

  putApi(path: string, useToken = false, params: any = {}) {
    console.log('full path', `${this.baseUrl}${path}`);
    return axios
      .put(
        `${this.baseUrl}${path}`,
        params,
        useToken ? {headers: this.header} : {},
      )
      .then(res => res.data)
      .catch(err => throwMessage(err));
  }

  deleteApi(path: string, useToken = false) {
    console.log('full path', `${this.baseUrl}${path}`);
    return axios
      .delete(`${this.baseUrl}${path}`, useToken ? {headers: this.header} : {})
      .then(res => res.data)
      .catch(err => throwMessage(err));
  }

  deleteApiWithParams(path: string, params: any, useToken = false) {
    console.log('full path', `${this.baseUrl}${path}`);
    const paramsString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return axios
      .delete(
        `${this.baseUrl}${path}?${paramsString}`,
        useToken ? {headers: this.header} : {},
      )
      .then(res => res.data)
      .catch(err => throwMessage(err));
  }
}

const removeSlash = (path?: string) => {
  if (!path) {
    return '';
  }
  return path.replace(/\/$/, '');
};

const throwMessage = (err: any) => {
  if (err.response) {
    throw err.response.data.message;
  } else if (err.request) {
    throw 'Network error';
  } else {
    throw err.message;
  }
};
