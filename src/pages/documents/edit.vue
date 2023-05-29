<template>
  <div class="max-w-6xl h-screen mx-auto">
    <loading v-if="isLoading"/>
    <div class="editor-area" v-else>
      <div v-if="viewers && viewers.length > 0" class="editor-header flex items-center justify-end">
        <div class="flex mb-5 -space-x-4">
          <user
            v-for="(viewer, index) in viewers"
            :key="`viewer-${index}-${viewer.email}-${viewer.id}`"
            :item="viewer"
          />
        </div>
      </div>
      <c-input v-model="form.title" class="mb-4"/>
      <textarea class="w-full px-5 py-4 rounded-md" style="height: calc(100vh - 50px);"
                v-model="form.content"></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { setEditDocumentId, removeEditDocumentId } from '@/utils/cookie-helper';
// import { socket, state } from '@/socket';
import loading from '@/components/common/loading';
import cInput from '@/components/common/c-input';
import user from '@/components/common/user';

export default {
  name: 'DocumentEdit',
  components: {
    loading,
    cInput,
    user,
  },
  computed: {
    ...mapGetters('document', [
      'getEditDocument',
    ]),
    ...mapGetters('auth', [
      'getUser',
      'getToken',
    ]),
  },
  data() {
    return {
      isLoading: false,
      form: {
        title: '',
        content: '',
      },
      status: WebSocket.CONNECTING,
      socket: null,
      viewers: [],
    };
  },
  methods: {
    connect() {
      const url = `ws://localhost:8001/ws/doc/${this.$route.params.documentId}/edit/?token=${this.getToken.access_token}`;

      this.status = WebSocket.CONNECTING;
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('Connected 🎉');
        this.status = WebSocket.OPEN;
      };

      this.socket.onerror = (error) => {
        console.log('An error occurred while connection establishing ⛔️', error);
        this.status = WebSocket.CLOSED;
      };

      this.socket.onclose = () => {
        console.log('Disconnected ✅');
        this.status = WebSocket.CLOSED;

        // Try to reconnect.
        setTimeout(() => {
          this.connect();
        }, 3000);
      };

      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        const eventData = message.data;

        if (message.type === 'document_updated') {
          console.log('document_updated event received');
          const { title, content } = eventData;

          this.form.title = title;
          this.form.content = content;
        } else if (message.type === 'viewer_join') {
          console.log('viewer_join event received');
          this.viewers.push(eventData);
        } else if (message.type === 'viewer_leave') {
          console.log('viewer_leave event received');
          this.viewers = this.viewers.filter((item) => item.id !== eventData.id);
        }
      });
    },
    connectSocket() {
      this.connect();
    },
    fetchDocument() {
      this.isLoading = true;
      this.$store.dispatch('document/getDocument', {
        id: this.$route.params.documentId,
      }).then((response) => {
        if (response && response.status === 200) {
          this.form.title = this.getEditDocument.title;
          this.form.content = this.getEditDocument.content;
        }
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
  created() {
    this.fetchDocument();
    this.connectSocket();
  },
  watch: {
    status: function handle(value) {
      if (value === WebSocket.OPEN) {
        const data = {
          type: 'viewer_join',
          data: this.getUser,
        };
        this.socket.send(JSON.stringify(data));
      } if (value === WebSocket.CLOSING || value === WebSocket.CLOSED) {
        const data = {
          type: 'viewer_leave',
          data: this.getUser,
        };
        this.socket.send(JSON.stringify(data));
      }
    },
    'form.title': function handle() {
      setTimeout(() => {
        if (this.status === WebSocket.OPEN) {
          const data = {
            type: 'document_updated',
            data: this.form,
          };
          this.socket.send(JSON.stringify(data));
        }
      }, 200);
    },
    'form.content': function handle() {
      setTimeout(() => {
        if (this.status === WebSocket.OPEN) {
          const data = {
            type: 'document_updated',
            data: this.form,
          };
          this.socket.send(JSON.stringify(data));
        }
      }, 200);
    },
  },
};
</script>

<style scoped>

</style>
