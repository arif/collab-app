import store from 'store';

// Auth
const tokenKey = process.env.VUE_APP_TOKEN_KEY;
export const getAuthToken = () => store.get(tokenKey);
export const setAuthToken = (token) => {
  store.set(tokenKey, token);
};
export const removeAuthToken = () => store.remove(tokenKey);
