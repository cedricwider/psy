<template>
  <div class="container therapies-list">
    <c-list
      v-slot="slotProps"
      :collection="therapySessions"
    >
      <c-cell
        class="list-cell"
        @click="onTherapySessionSelected(slotProps.item)"
      >
        <template>{{ slotProps.item.title }}</template>
        <template v-slot:description>
          {{ sessionDescription(slotProps.item) }}
        </template>
      </c-cell>
    </c-list>
  </div>
</template>

<script>
import CList from '../shared/list_view.vue';
import CCell from '../shared/list_cell.vue';

export default {
  components: {
    CList,
    CCell,
  },
  props: {
    therapySessions: {
      required: true,
      type: Array,
    },
  },
  methods: {
    onTherapySessionSelected(therapySession) {
      this.$emit('select', therapySession);
    },
    sessionDescription(therapySession) {
      return `${therapySession.duration} min`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
