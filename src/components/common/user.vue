<template>
  <div v-if="item && Object.keys(item).length > 0"
    v-tooltip="item.full_name"
    class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
    <span class="font-medium text-gray-600 dark:text-gray-300">{{ initials }}</span>
  </div>
</template>

<script>

export default {
  name: 'user',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    initials() {
      const firstNameInitial = this.item.first_name[0];
      const lastNameInitial = this.item.last_name[0];

      return `${firstNameInitial}${lastNameInitial}`;
    },
  },
};
</script>
