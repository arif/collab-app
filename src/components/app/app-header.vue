<template>
<header class="w-full py-3 px-4">
    <div class="flex w-full h-full items-center justify-between">
      <div class="header-left">
        <a href="/">
          <logo />
        </a>
      </div>
      <div class="header-right flex">
        <div v-if="getUser" class="relative user flex flex-row items-center">
          <img
            :src="imgPath(getUser.picture)"
            :alt="getUser.full_name"
            class="inline-block h-12 w-12 rounded-full ring-2 ring-collab-300 cursor-pointer"
            @click="toggleActionsDropdown"
          >
          <transition name="ease-in-out">
          <div
            v-if="actionsDropdownActive"
            ref="actionsDropdown"
            class="actions-dropdown absolute backdrop-blur-sm bg-white/60 mt-2 right-0 top-12 min-w-[150px] rounded-lg">
            <div class="flex flex-col">
              <span class="menu-item py-2 px-3 cursor-default text-collab-900 border-b-[1px] border-collab-300">
                {{ getUser && getUser.full_name }}
              </span>
              <span class="menu-item py-2 px-3 cursor-pointer hover:bg-collab-200 hover:transition text-collab-900">
                <router-link :to="{ name: 'Logout' }" class="block">Logout</router-link>
              </span>
            </div>
          </div>
        </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import logo from '@/components/app/logo';

export default {
  name: 'app-header',
  components: {
    logo,
  },
  data() {
    return {
      actionsDropdownActive: false,
    };
  },
  computed: {
    ...mapGetters('auth', [
      'getUser',
    ]),
  },
  methods: {
    toggleActionsDropdown() {
      this.actionsDropdownActive = !this.actionsDropdownActive;
    },
    closeDropdown(event) {
      if (
        this.actionsDropdownActive
        && !this.$refs.actionsDropdown.contains(event.target)
        && !this.$refs.actionsDropdown.parentElement.contains(event.target)
      ) {
        this.actionsDropdownActive = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>
<style lang="scss" scoped>
.menu-item {
  &:first-child {
    &:hover {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  }
  &:last-child {
    &:hover {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
}
.ease-in-out-enter-active,
.ease-in-out-leave-active {
  transition: opacity 0.1s ease-in-out;
}
.ease-in-out-enter-from,
.ease-in-out-leave-to {
  opacity: 0;
}
</style>
