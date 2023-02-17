import axios from 'axios';

axios.defaults.timeout = 10000;

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
    return axios.get(
      `${this.baseUrl}/${path}/`,
      useToken ? {headers: this.header} : {},
    );
  }

  getApiWithParams(path: string, params: any, useToken = false) {
    const paramsString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return axios.get(
      `${this.baseUrl}/${path}?${paramsString}`,
      useToken ? {headers: this.header} : {},
    );
  }

  postApi(path: string, useToken = false, params: any = {}) {
    console.log('full path', `${this.baseUrl}/${path}`);
    return axios.post(
      `${this.baseUrl}/${path}`,
      params,
      useToken ? {headers: this.header} : {},
    );
  }

  putApi(path: string, useToken = false, params: any = {}) {
    return axios.put(
      `${this.baseUrl}/${path}`,
      params,
      useToken ? {headers: this.header} : {},
    );
  }

  deleteApi(path: string, useToken = false) {
    return axios.delete(
      `${this.baseUrl}/${path}`,
      useToken ? {headers: this.header} : {},
    );
  }

  deleteApiWithParams(path: string, params: any, useToken = false) {
    const paramsString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return axios.delete(
      `${this.baseUrl}/${path}?${paramsString}`,
      useToken ? {headers: this.header} : {},
    );
  }
}

const removeSlash = (path?: string) => {
  if (!path) {
    return '';
  }
  return path.replace(/\/$/, '');
};
