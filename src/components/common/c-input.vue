<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-collab-900 mb-1 select-none" @click="focusInput">{{ label }}</label>
    <input
      v-model="inputValue"
      :type="type"
      :class="defaultInputClasses"
      ref="input"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
import { defaultInputClasses } from '@/utils/components/input';

const VALID_TYPES = [
  'text',
  'password',
  'email',
];

export default {
  name: 'c-input',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value) => VALID_TYPES.includes(value),
    },
    value: {
      type: [String, Number],
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      inputValue: this.value,
      defaultInputClasses: defaultInputClasses(),
    };
  },
  methods: {
    focusInput() {
      this.$refs.input.focus();
    },
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue;
    },
    inputValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style scoped>

</style>
