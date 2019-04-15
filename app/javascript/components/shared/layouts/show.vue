<template>
  <div class="show-layout">
    <section class="title">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link
              class="button is-secondary"
              :to="backLink"
            >
              Zur Übersicht
            </router-link>
          </div>
        </div>
        <div class="level-item">
          <slot name="title" />
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link
              class="button is-secondary"
              :to="editLink"
            >
              Bearbeiten
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    backLink: {
      type: Object,
      required: true,
    },
    editLink: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
