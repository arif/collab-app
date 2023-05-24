<template>
  <div class="
    flex flex-col relative bg-collab-50 rounded-md px-5 py-3 w-52 h-80 shadow-sm hover:shadow-xl hover:scale-[1.02] transition cursor-pointer
  ">
    <span class="text-gray-900 text-xl relative z-10">{{ item.title }}</span>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bfc3e2" class="w-40 h-40">
        <path v-for="(p, i) in iconPaths" :key="`icon-path-${i}`" :fill-rule="p.fillRule" :clip-rule="p.clipRule" :d="p.d" />
      </svg>
    </div>
    <div class="absolute flex flex-col border-t border-gray-300 w-full left-0 right-0 bottom-0 py-2 px-4">
      <span class="text-sm text-gray-600">{{ item.author.full_name }}</span>
      <span class="text-xs text-gray-400">Created: {{ formatDate(item.created) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'document-item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconPaths() {
      return [
        {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z',
        },
        {
          fillRule: null,
          clipRule: null,
          d: 'M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z',
        },
      ];
    },
  },
};
</script>

<style lang="scss"></style>
