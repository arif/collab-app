import { reactive } from 'vue';
// import { io } from 'socket.io-client';
import { getAuthToken, getEditDocumentId } from '@/utils/cookie-helper';

export const state = reactive({
  status: WebSocket.CLOSED,
  viewers: [],
  err: null,
  document: {
    title: '',
    content: '',
  },
});

const documentId = getEditDocumentId();
const token = getAuthToken();
const URL = `ws://localhost:8001/ws/doc/${documentId}/edit/?token=${token.access_token}`;

export const socket = new WebSocket(URL);

socket.onopen = () => {
  console.log('Connected 🎉');
  state.status = socket && socket.readyState;
};

socket.onerror = (err) => {
  console.log('An error occurred while connection establishing ⛔️', err);
  state.err = err;
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const eventData = message.data;

  if (message.type === 'document_updated') {
    const { title, content } = eventData;

    state.document.title = title;
    state.document.content = content;
  } else if (message.type === 'viewer_join') {
    state.viewers.push(eventData);
  } else if (message.type === 'viewer_leave') {
    state.viewers = state.viewers.filter((item) => item.id !== eventData.id);
  }
};

socket.onclose = () => {
  console.log('Disconnected ✅');
};
