<template>
  <div class="min-h-screen bg-gradient-to-r from-collab-500 to-collab-600">
    <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:mx-auto sm:w-full sm:max-w-md justify-center items-center">
        <div class="relative">
          <a href="/">
            <logo :width="190" :height="55" />
          </a>
        </div>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/components/app/logo.vue';

export default {
  name: 'AuthLayout',
  components: {
    logo,
  },
};
</script>

<style scoped>

</style>
