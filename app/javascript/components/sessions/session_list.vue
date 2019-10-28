<template>
  <section class="session-list">
    <div class="cell-container">
      <session-cell
        v-for="session in sessions"
        :key="session.id"
        :session="session"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.cell-container {
  border-top: 1px black solid;
}
</style>
