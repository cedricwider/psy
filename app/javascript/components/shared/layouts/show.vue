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
            <div class="stacked">
              <router-link
                class="button is-secondary"
                :to="editLink"
              >
                Bearbeiten
              </router-link>
              <button
                v-if="showDelete"
                class="button is-danger stack-item"
                @click="onDeleteClicked"
              >
                Löschen
              </button>
            </div>
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
    showDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    onDeleteClicked() {
      this.$dialog.confirm({
        message: 'Willst Du wirklich löschen?',
        cancelText: 'Nein',
        confirmText: 'Ja',
        onConfirm: () => {
          this.$emit('delete');
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.stacked {
  display: flex;
  flex-direction: column;
}
.stack-item:nth-child(n + 1) {
  margin-top: 0.5rem;
}
</style>
