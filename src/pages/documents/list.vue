<template>
  <loading v-if="isLoading" overlay transparent variant="light" />
  <div
    v-else
    class="max-w-6xl mx-auto"
  >
    <h3 class="text-white text-4xl">Recent Documents</h3>
    <div v-if="getDocuments && getDocuments.length > 0" class="grid grid-cols-5 mt-6">
      <document-item
        v-for="(document, index) in getDocuments"
        :key="`document-item-${document.id}-${index}`"
        :item="document"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import loading from '@/components/common/loading';
import documentItem from '@/components/documents/document-item';

export default {
  name: 'DocumentList',
  components: {
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
    };
  },
  methods: {
    fetchDocuments() {
      if (!this.getDocuments) {
        this.isLoading = true;
        this.$store.dispatch('document/getDocuments').finally(() => {
          this.isLoading = false;
        });
      }
    },
  },
  created() {
    this.fetchDocuments();
  },
};
</script>

<style scoped>

</style>
