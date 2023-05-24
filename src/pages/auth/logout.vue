<template>
  <div>
    <loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import loading from '@/components/common/loading';

export default {
  name: 'logout',
  components: {
    loading,
  },
  computed: {
    ...mapGetters('auth', [
      'getUser',
    ]),
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
    if (!this.getUser) {
      this.$router.push({ name: 'Login' });
      this.isLoading = false;
    } else {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'Login' });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
};
</script>
