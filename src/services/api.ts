import ApiGenerator from 'services/ApiGenerator';
import {IUser} from 'src/interface';

export const BASE_URL = 'http://192.168.2.5:8080';
export const WS_URL = 'ws://192.168.2.5:8080/ws/';

export const LOGIN = '/api/v1/login';
export const REGISTER = '/api/v1/register';

export const HANDLE_CHANNEL = '/api/v1/handle_chanel';

export const Api = new ApiGenerator(BASE_URL, '');

export const testCall = () => {
  return Api.getApi('/api/v1');
};

export const login = (data: Partial<IUser>) => {
  return Api.postApi(LOGIN, false, data);
};

export const register = (data: Partial<IUser>) => {
  return Api.postApi(REGISTER, false, data);
};

export const getListChannel = () => {
  return Api.getApi(HANDLE_CHANNEL, true);
};

export const createChannel = (data: {name: string; userIDs: string[]}) => {
  return Api.postApi(HANDLE_CHANNEL, true, data);
};
