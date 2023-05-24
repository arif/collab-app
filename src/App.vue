<template>
  <div>
    <router-view v-if="$route.meta.title" :key="routeKey"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    routeKey() {
      return this.$route.fullPath;
    },
  },
};
</script>
