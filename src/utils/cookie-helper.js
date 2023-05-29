import store from 'store';

// Auth
const tokenKey = process.env.VUE_APP_TOKEN_KEY;
const editDocumentKey = process.env.VUE_APP_EDIT_DOCUMENT_KEY;

export const getAuthToken = () => store.get(tokenKey);
export const setAuthToken = (token) => {
  store.set(tokenKey, token);
};
export const removeAuthToken = () => store.remove(tokenKey);

export const getEditDocumentId = () => store.get(editDocumentKey);

export const setEditDocumentId = (documentId) => {
  store.set(editDocumentKey, documentId);
};

export const removeEditDocumentId = () => store.remove(editDocumentKey);
