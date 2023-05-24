<template>
  <div :class="{
    'spinner-page': true,
    overlay: overlay,
    transparent: transparent,
    dark: variant === 'dark',
    'spinner-button': isButton
  }" v-if="loading">
    <div class="spinner">
      <div class="spinner-dot spinner-dot-one"></div>
      <div class="spinner-dot spinner-dot-two"></div>
      <div class="spinner-dot spinner-dot-three"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    isButton: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'light',
      validator: (value) => ['light', 'dark'].includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner-page {
  text-align: center;
  &.overlay {
    position: absolute;
    top: 50%;
    left: -50%;
    background: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    transform: translate(50%, -50%);
    align-items: center;
    justify-content: center;
    z-index: 99;
    &.transparent {
      background: rgba(255, 255, 255, 0)
    }
  }
  &.spinner-button {
    display: inline;
    .spinner-dot {
      background-color: #fff;
    }
  }
}
.spinner {
  display: inline-flex;
  -webkit-box-pack: distribute;
  -moz-box-pack: distribute;
  box-pack: distribute;
  -webkit-justify-content: space-around;
  -moz-justify-content: space-around;
  -ms-justify-content: space-around;
  -o-justify-content: space-around;
  justify-content: space-around;
  -ms-flex-pack: distribute;
  position: relative;
  vertical-align: middle;
  width: 30px;
  height: 6px
}
.spinner .spinner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  -webkit-animation: pulse .85s infinite ease-in-out;
  -o-animation: pulse .85s infinite ease-in-out;
  animation: pulse .85s infinite ease-in-out
}
.dark {
  .spinner {
    .spinner-dot {
      background-color: rgba(74, 70, 105, 100);
    }
  }
}
.spinner .spinner-dot.spinner-dot-one {
  -webkit-animation-delay: -.2s;
  animation-delay: -.2s
}
.spinner .spinner-dot.spinner-dot-two {
  -webkit-animation-delay: -.1s;
  animation-delay: -.1s
}
@keyframes pulse {
  0%,100%,80% {
    opacity: 0;
    transform: scale(.8)
  }
  40% {
    opacity: 1;
    transform: scale(1)
  }
}
</style>
