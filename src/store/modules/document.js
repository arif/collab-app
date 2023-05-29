import api from '@/api';

const types = {
  SET_DOCUMENTS: 'SET_DOCUMENTS',
  SET_EDIT_DOCUMENT: 'SET_EDIT_DOCUMENT',
};

const state = {
  documents: null,
  editDocument: null,
};

const getters = {
  getDocuments: (state) => state.documents,
  getEditDocument: (state) => state.editDocument,
};

const mutations = {
  [types.SET_DOCUMENTS](state, payload) {
    state.documents = payload;
  },
  [types.SET_EDIT_DOCUMENT](state, payload) {
    state.editDocument = payload;
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
  async getDocument({ commit }, { id: documentId }) {
    const response = await api.getDocument(documentId);
    if (response && response.status === 200) {
      commit(types.SET_EDIT_DOCUMENT, response.data);
    }
    return response;
  },
  async createDocument(commit, params) {
    const response = await api.createDocument(params);
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
