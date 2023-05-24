import api from '@/api';

const types = {
  SET_DOCUMENTS: 'SET_DOCUMENTS',
};

const state = {
  documents: null,
};

const getters = {
  getDocuments: (state) => state.documents,
};

const mutations = {
  [types.SET_DOCUMENTS](state, payload) {
    state.documents = payload;
  },
};

const actions = {
  async getDocuments({ commit }) {
    const response = await api.listDocuments();
    if (response && (response.status === 200 || response.status === 204)) {
      commit(types.SET_DOCUMENTS, response.data);
    }
    return response;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
