<template>
  <button
    :class="classes"
    :disabled="disabled"
    :type="type"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script>
const VARIANTS_MAPPING = {
  primary: 'bg-collab-primary text-collab-100 enabled:hover:bg-collab-primary-dark focus:ring-2 focus:ring-collab-primary',
  secondary: 'bg-collab-secondary text-collab-100 enabled:hover:bg-collab-secondary-dark focus:ring-2 focus:ring-collab-secondary',
  success: 'bg-collab-success text-collab-100 enabled:hover:bg-collab-success-dark focus:ring-2 focus:ring-collab-success',
  warning: 'bg-collab-warning text-collab-100 enabled:hover:bg-collab-warning-dark focus:ring-2 focus:ring-collab-warning',
  danger: 'bg-collab-danger text-collab-100 enabled:hover:bg-collab-danger-dark focus:ring-2 focus:ring-collab-danger',
  info: 'bg-collab-info text-collab-100 enabled:hover:bg-collab-info-dark focus:ring-2 focus:ring-collab-info',
  dark: 'bg-collab-dark text-collab-100 enabled:hover:bg-collab-dark-light focus:ring-2 focus:ring-dark-collab-light',
  light: 'bg-collab-light text-gray-800 enabled:hover:bg-collab-light-dark focus:ring-2 focus:ring-collab-light-dark',
  'outline-primary': 'border-collab-primary text-collab-primary-dark border-primary-dark enabled:hover:bg-collab-primary enabled:hover:text-collab-100 focus:outline-none focus:ring-2 focus:ring-collab-primary',
  'outline-secondary': 'border-collab-secondary text-collab-secondary-dark border-secondary-dark enabled:hover:bg-collab-secondary enabled:hover:text-collab-100 focus:outline-none focus:ring-2 focus:ring-collab-secondary',
  'outline-success': 'border-collab-success text-collab-success-dark border-success-dark enabled:hover:bg-collab-success enabled:hover:text-collab-100 focus:outline-none focus:ring-2 focus:ring-collab-success',
  'outline-warning': 'border-collab-warning text-collab-warning-dark border-warning-dark enabled:hover:bg-collab-warning enabled:hover:text-collab-100 focus:outline-none focus:ring-2 focus:ring-collab-warning',
  'outline-danger': 'border-collab-danger text-collab-danger-dark border-danger-dark enabled:hover:bg-collab-danger enabled:hover:text-collab-100 focus:outline-none focus:ring-2 focus:ring-collab-danger',
  'outline-info': 'border-collab-info text-info-collab-dark border-info-dark enabled:hover:bg-collab-info enabled:hover:text-collab-100 focus:outline-none focus:ring-2 focus:ring-collab-info',
  'outline-dark': 'border-collab-dark text-dark-collab-light border-dark-light enabled:hover:bg-collab-dark-light enabled:hover:text-collab-100 focus:outline-none focus:ring-2 focus:ring-dark-collab-light',
  'outline-light': 'border-collab-light text-collab-secondary-dark border-light-dark enabled:hover:bg-collab-light-dark enabled:hover:text-collab-dark focus:outline-none focus:ring-2 focus:ring-light-collab-dark',
};

const SIZES_MAPPING = {
  xs: 'py-1 px-2 text-xs',
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-md',
  lg: 'py-3 px-5 text-lg',
  xl: 'py-4 px-6 text-xl',
};

export default {
  name: 'c-button',
  props: {
    type: {
      type: String,
      default: 'button',
      validators: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'primary',
      validators: (value) => Object.keys(VARIANTS_MAPPING).includes(value),
    },
    size: {
      type: String,
      default: 'md',
      validators: (value) => Object.keys(SIZES_MAPPING).includes(value),
    },
    block: {
      type: Boolean,
      default: false,
    },
    squared: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getRoundedClass() {
      if (this.pill) {
        return 'rounded-full';
      } if (this.squared) {
        return '';
      }
      return 'rounded-md';
    },
    classes() {
      const sizeClass = SIZES_MAPPING[this.size];
      const variantClass = VARIANTS_MAPPING[this.variant];

      return [
        this.getRoundedClass,
        'transition-all duration-200 ease-in-out',
        sizeClass,
        variantClass,
        {
          'disabled:opacity-50 cursor-not-allowed': this.disabled,
        },
        {
          'w-full': this.block,
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
