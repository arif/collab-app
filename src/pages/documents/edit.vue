<template>
  <div class="max-w-6xl h-screen mx-auto">
    <loading v-if="isLoading"/>
    <div class="edit-area" v-else>
      <c-input v-model="form.title" class="mb-4"/>
      <textarea class="w-full px-5 py-4 rounded-md" style="height: calc(100vh - 50px);"
                v-model="form.content"></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { setEditDocumentId, removeEditDocumentId } from '@/utils/cookie-helper';
import { socket, state } from '@/socket';
import loading from '@/components/common/loading';
import cInput from '@/components/common/c-input';

export default {
  name: 'DocumentEdit',
  components: {
    loading,
    cInput,
  },
  computed: {
    ...mapGetters('document', [
      'getEditDocument',
    ]),
    ...mapGetters('auth', [
      'getUser',
    ]),
    status() {
      return state.status;
    },
    viewers() {
      return state.viewers;
    },
    documentState() {
      return state.document;
    },
  },
  data() {
    return {
      isLoading: false,
      form: {
        title: state.document.title,
        content: state.document.content,
      },
    };
  },
  methods: {
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
    leaveAndCloseConnection() {
      if (this.status === WebSocket.OPEN) {
        const data = {
          type: 'viewer_leave',
          data: this.getUser,
        };
        socket.send(JSON.stringify(data));
      }
    },
    closeSocketConnection() {
      socket.close();
    },
  },
  created() {
    setEditDocumentId(this.$route.params.documentId);
    this.fetchDocument();
  },
  mounted() {
    if (this.status === WebSocket.OPEN) {
      const data = {
        type: 'viewer_join',
        data: this.getUser,
      };
      socket.send(JSON.stringify(data));
    }
  },
  beforeUnmount() {
    removeEditDocumentId();
    this.leaveAndCloseConnection();
  },
  unmounted() {
    this.closeSocketConnection();
  },
  watch: {
    'form.title': function handle() {
      if (this.status === WebSocket.OPEN) {
        const data = {
          type: 'document_updated',
          data: this.form,
        };
        socket.send(JSON.stringify(data));
      }
    },
    'form.content': function handle() {
      if (this.status === WebSocket.OPEN) {
        const data = {
          type: 'document_updated',
          data: this.form,
        };
        socket.send(JSON.stringify(data));
      }
    },
  },
};
</script>

<style scoped>

</style>
