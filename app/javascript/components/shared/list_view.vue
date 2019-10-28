<template>
  <div class="container list-view">
    <ul class="list-frame">
      <li
        v-for="(item, index) in collection"
        :key="index"
        class="list-cell"
      >
        <slot :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../packs/style/colors.scss';

.list-frame {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  margin: 0;
}

.list-cell {
  padding: 0.5rem 0.75rem;
  line-height: 1.5;
  border-bottom: 1px $red-light-2 solid;
}
.list-cell:last-child {
  border: none;
}
</style>
