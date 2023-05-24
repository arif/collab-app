import api from '@/api';
import {
  getAuthToken, setAuthToken, removeAuthToken,
} from '@/utils/cookie-helper';
import { parseJWT } from '@/utils/jwt';

const types = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER: 'SET_USER',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
  LOGOUT: 'LOGOUT',
};

const state = {
  user: null,
  token: getAuthToken() || null,
  permissions: null,
  isSplashLoading: false,
};

const getters = {
  getUser: (state) => state.user,
  getToken: (state) => state.token,
  getPermissions: (state) => state.permissions,
  getSplashLoading: (state) => state.isSplashLoading,
};

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.SET_PERMISSIONS](state, permissions) {
    state.permissions = permissions;
  },
  [types.LOGOUT](state) {
    state.user = null;
    state.token = null;
    removeAuthToken();
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    const params = {
      email,
      password,
    };

    const response = await api.login(params);

    if (response && response.status === 200) {
      commit(types.SET_TOKEN, response.data);
      setAuthToken(response.data);
    }

    return response;
  },
  async refresh({ commit }, data) {
    removeAuthToken();

    const response = await api.refresh(data);
    if (response && response.status === 200) {
      commit(types.SET_TOKEN, response.data);
      setAuthToken(response.data);
    }

    return response;
  },
  async verify({ commit }, data) {
    const response = await api.verify(data);
    const parsed = parseJWT(data.token);

    if (Object.hasOwnProperty.call(parsed, 'permissions')) {
      commit(types.SET_PERMISSIONS, parsed.permissions);
    } else {
      commit(types.SET_PERMISSIONS, []);
    }

    if (response && response.status === 200) {
      commit(types.SET_USER, response.data);
    }

    return response;
  },
  async logout({ commit }) {
    commit(types.LOGOUT);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
