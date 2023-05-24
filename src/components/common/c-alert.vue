<template>
  <transition :name="transitionName">
      <div v-if="visible" :class="classes">
      <div
        v-if="dismissible"
        class="close-button absolute top-0 right-0 py-3 px-5 cursor-pointer"
        @click="dismiss"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="#d7dbee"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <slot />
    </div>
  </transition>
</template>

<script>
const VARIANTS_MAPPING = {
  primary: 'bg-collab-primary-light text-collab-primary-dark',
  secondary: 'bg-collab-secondary-light text-collab-secondary-dark',
  success: 'bg-collab-success-light text-collab-success-dark',
  warning: 'bg-collab-warning-light text-collab-warning-dark',
  danger: 'bg-collab-danger-light text-collab-danger-dark',
  info: 'bg-collab-info-light text-collab-info-dark',
  dark: 'bg-collab-dark text-collab-50',
  light: 'bg-collab-light text-gray-800',
};

export default {
  name: 'c-alert',
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    fade: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'info',
      validators: (value) => Object.keys(VARIANTS_MAPPING).includes(value),
    },
  },
  data() {
    return {
      visible: this.show,
    };
  },
  computed: {
    transitionName() {
      return this.fade ? 'fade' : null;
    },
    classes() {
      const variantClass = VARIANTS_MAPPING[this.variant];

      return [
        'c-alert',
        'relative',
        'rounded-md',
        'py-3',
        'px-5',
        variantClass,
      ];
    },
  },
  methods: {
    dismiss() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
