<template>
  <vee-form @submit="onSubmit" v-slot="{ meta: { valid: isValid } }">
    <vee-field
      name="email"
      type="email"
      label="Email"
      v-model="form.email"
      :rules="{ required: true, email: true }"
      v-slot="{ field, errors }"
    >
      <c-input
        v-bind="field"
        label="Email"
        id="login-email"
        :class="{ 'mb-2': !errors || errors.length === 0 }"
      />
      <ul v-if="errors && errors.length > 0" class="text-red-600 mt-1 mb-2">
        <li v-for="(error, index) in errors" :key="`login-form-email-error-${index}`">
          {{ error }}
        </li>
      </ul>
    </vee-field>
    <vee-field
      name="password"
      type="password"
      label="Password"
      v-model="form.password"
      :rules="{ required: true, min: 8 }"
      v-slot="{ field, errors }"
    >
      <c-input
        v-bind="field"
        type="password"
        label="Password"
        id="login-password"
      />
      <ul v-if="errors && errors.length > 0" class="text-red-600 mt-1">
        <li v-for="(error, index) in errors" :key="`login-form-password-error-${index}`">
          {{ error }}
        </li>
      </ul>
    </vee-field>
    <c-button type="submit" class="mt-5" :disabled="isLoading || !isValid" block>
      <loading v-if="isLoading" is-button />
      <span v-if="!isLoading" class>Login</span>
    </c-button>
  </vee-form>
</template>

<script>
import loading from '@/components/common/loading';
import cInput from '@/components/common/c-input';
import cButton from '@/components/common/c-button';

export default {
  name: 'login',
  components: {
    loading,
    cInput,
    cButton,
  },
  data() {
    return {
      isLoading: false,
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit(values) {
      const { email, password } = values;
      this.isLoading = true;
      this.$store.dispatch('auth/login', {
        email,
        password,
      }).then((response) => {
        if (response && response.status === 200) {
          this.$router.push({ name: 'DocumentList' });
        }
      }).catch((error) => {
        this.$toast.error(error.response.data.detail);
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped>

</style>
