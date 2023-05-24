// import { objToFormData } from '@/utils/form-data';
import * as http from './http-common';

class API {
  // A1
  static async login(params) {
    const options = {
      method: 'post',
      url: '/login/',
      data: params,
    };

    return http.auth(options);
  }

  // A2
  static async loginAs(params) {
    const options = {
      method: 'post',
      url: '/login-as/',
      params,
    };

    return http.auth(options);
  }

  // A3
  static async refresh(data) {
    const options = {
      method: 'post',
      url: '/refresh/',
      data,
    };

    return http.auth(options);
  }

  // A4
  static async verify(data) {
    const options = {
      method: 'post',
      url: '/me/',
      data,
    };

    return http.auth(options);
  }

  // D1
  static async listDocuments() {
    const options = {
      method: 'get',
      url: '/documents/',
    };

    return http.document(options);
  }
}

export default API;
