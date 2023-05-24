<template>
  <div class="min-h-screen bg-gradient-to-r from-collab-500 to-collab-600">
    <app-header />
    <div class="main-container mt-2.5">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import appHeader from '@/components/app/app-header';

export default {
  name: 'DefaultLayout',
  components: {
    appHeader,
  },
  computed: {
    ...mapGetters('auth', [
      'getUser',
    ]),
  },
};
</script>

<style scoped>

</style>
