<template>
  <div class="loading">
    <div
      ref="container"
      class="loading-container"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    fullScreen: {
      type: Boolean,
      required: false,
      default: true,
    },
    isCancellable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    loadingContainer() {
      if (this.fullScreen) return null;
      return this.$refs.container;
    },
  },
  watch: {
    loading(newValue) {
      if (newValue) {
        this.showLoadingSpinner();
      } else {
        this.hideLoadingSpinner();
      }
    },
  },
  methods: {
    onClose() {
      console.log('Loading indicator closed');
      this.$emit('closed');
    },
    showLoadingSpinner() {
      this.loadingComponent = this.$loading.open({
        canCancel: this.isCancellable,
        isFullPage: this.fullScreen,
        container: this.loadingContainer,
      });
    },
    hideLoadingSpinner() {
      if (!this.loadingComponent) return;

      this.loadingComponent.close();
    },
  },
  loaded() {
    if (this.loading) this.showLoadingSpinner();
  },
};
</script>
<style lang="scss" scoped></style>
