<template>
  <div
    class="list-cell"
    @click="onClick"
  >
    <div class="cell-icon">
      <slot name="icon" />
    </div>
    <div class="cell-body">
      <div class="cell-body-title">
        <slot />
      </div>
      <div class="cell-body-description">
        <slot name="description" />
      </div>
    </div>
    <div class="chevron">
      <slot
        v-if="!hideAction"
        class="glyph"
        name="glyph"
      >
        <b-icon icon="chevron-right" />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hideAction: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0;
}
.cell-body {
  flex: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0 0.75rem;
}
.cell-body-title {
  flex: 2;
}
.cell-icon {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chevron {
  min-height: 100%;
  max-width: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
