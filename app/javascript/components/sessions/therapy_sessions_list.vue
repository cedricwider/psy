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
        <template>
          <div class="title-container level">
            <h5 class="intro level-left title is-5">
              MyTherapy
            </h5>
            <span class="level-right subtitle is-5">{{ slotProps.item.title }}</span>
          </div>
        </template>
        <template v-slot:description>
          {{ therapySessionDescription(slotProps.item) }}
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
    therapySessionDescription(therapySession) {
      console.log(`Getting description for: ${JSON.stringify(therapySession)}`);
      return `${therapySession.duration} min`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
