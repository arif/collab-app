import axios from 'axios';
import store from '@/store';
import router from '@/router';
import httpStatus from '@/utils/http-status';
import { getAuthToken } from '@/utils/cookie-helper';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

export const auth = axios.create({
  baseURL: process.env.VUE_APP_API_AUTH_URI,
});

export const document = axios.create({
  baseURL: process.env.VUE_APP_API_DOCUMENT_URI,
});

axios.defaults.headers = {
  'Content-Type': 'application/json',
};

function getConfig(config) {
  const token = getAuthToken();

  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token.access_token}`;
  }

  return config;
}

auth.interceptors.request.use(
  (config) => getConfig(config),
  (error) => Promise.reject(error),
);

document.interceptors.request.use(
  (config) => getConfig(config),
  (error) => Promise.reject(error),
);

let subscribers = [];

function onAccessTokenFetched(access) {
  subscribers = subscribers.filter((callback) => callback(access));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

function responseError(error) {
  const { config, response: { status } } = error;
  const originalRequest = config;

  const token = getAuthToken();

  if (status === httpStatus.UNAUTHORIZED && token) {
    store.dispatch('auth/refresh', { refresh: token.refresh_token })
      .then((response) => {
        if (response && response.status === 200) {
          onAccessTokenFetched(response.data.access_token);
          return response;
        }
        return Promise.reject(response);
      })
      .catch((err) => {
        store.dispatch('auth/logout');
        router.push({ name: 'Login' });
        return err;
      });

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((access) => {
        originalRequest.headers.Authorization = `Bearer ${access}`;
        resolve(axios(originalRequest));
      });
    });
    return retryOriginalRequest;
  }

  if (error.response.status !== httpStatus.UNAUTHORIZED && error.response.status >= httpStatus.BAD_REQUEST
    && error.response.status <= 599) {
    const { data, statusText } = error.response;
    if (typeof data === 'string') {
      toast.error(data);
    } else {
      const { detail } = data;
      const errDesc = Object.keys(data) && Object.keys(data)
        .filter((k) => k !== 'detail')
        .map((k) => `${k}: ${data[k]}`)
        .join('<br>');
      let errorMessage = '';
      if (detail) {
        errorMessage += `${detail}<br>`;
      }
      errorMessage += errDesc ? `${errDesc}` : '';
      if (errorMessage) toast.error(errorMessage);
      else toast.error(statusText);
    }
    return error;
  }
  return Promise.reject(error);
}

auth.interceptors.response.use(
  (response) => response,
  (error) => responseError(error),
);

document.interceptors.response.use(
  (response) => response,
  (error) => responseError(error),
);
