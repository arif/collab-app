<template>
  <div class="bg-white p-4">
    <div class="flex flex-col">
      <h2 class="text-4xl">Alerts</h2>

      <c-alert v-for="(variant, index) in alertVariants" :key="`alert-${variant}-${index}`" :variant="variant" show fade class="mb-2">
        {{ variant }} alert.
      </c-alert>
    </div>

    <div class="flex flex-col mt-2">
      <h2 class="text-4xl">Buttons</h2>

      <c-button v-for="(variant, index) in buttonVariants" :key="`button-${variant}-${index}`" :variant="variant" class="mb-2">
        {{ variant }} Button
      </c-button>
    </div>
  </div>
</template>

<script>
import cAlert from '@/components/common/c-alert.vue';
import cButton from '@/components/common/c-button.vue';

export default {
  name: 'TestPage',
  components: {
    cAlert,
    cButton,
  },
  data() {
    return {
      alertVariants: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'dark',
        'light',
      ],
      buttonVariants: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'dark',
        'light',
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-warning',
        'outline-danger',
        'outline-info',
        'outline-dark',
        'outline-light',
      ],
    };
  },
};
</script>

<style scoped>

</style>
