<template>
  <div class="max-w-6xl mx-auto">
    <div
      class="
        w-full h-40 flex items-center justify-center border border-dashed border-collab-300 text-4xl text-collab-300
        cursor-pointer transition hover:border-collab-400 hover:text-collab-400 mb-5
      "
      v-tooltip="'Create new document'"
      @click="createDocument"
    >
      <loading v-if="documentCreating" transparent variant="light" />
      <span v-else>+</span>
    </div>
    <div class="w-full">
      <div class="flex items-center justify-between">
        <h3 class="text-white text-4xl">Recent Documents</h3>
        <c-button @click="fetchDocuments">Refresh Documents</c-button>
      </div>
      <div v-if="!isLoading && getDocuments && getDocuments.length > 0" class="grid grid-cols-5 gap-y-5 mt-6">
        <document-item
          v-for="(document, index) in getDocuments"
          :key="`document-item-${document.id}-${index}`"
          :item="document"
        />
      </div>
      <loading v-if="isLoading" overlay transparent variant="light" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import loading from '@/components/common/loading';
import cButton from '@/components/common/c-button';
import documentItem from '@/components/documents/document-item';

export default {
  name: 'DocumentList',
  components: {
    cButton,
    documentItem,
    loading,
  },
  computed: {
    ...mapGetters('document', [
      'getDocuments',
    ]),
  },
  data() {
    return {
      isLoading: false,
      documentCreating: false,
    };
  },
  methods: {
    fetchDocuments() {
      this.isLoading = true;
      this.$store.dispatch('document/getDocuments').finally(() => {
        this.isLoading = false;
      });
    },
    createDocument() {
      this.documentCreating = true;
      this.$store.dispatch('document/createDocument', {
        title: '',
        content: '',
      }).then((response) => {
        if (response && response.status === 201) {
          const { headers: { 'x-document-id': documentId } } = response;
          this.$router.push({ name: 'DocumentEdit', params: { documentId } });
        }
      }).finally(() => {
        this.documentCreating = false;
      });
    },
  },
  created() {
    if (!this.getDocuments) {
      this.fetchDocuments();
    }
  },
};
</script>

<style scoped>

</style>
