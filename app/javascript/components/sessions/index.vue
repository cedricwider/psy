<template>
  <div class="sessions-index">
    <!-- Header -->
    <section class="header">
      <div class="level">
        <div class="level-left">
          <h1>Zeit-Erfassung</h1>
        </div>
        <div class="level-right" />
      </div>
      <c-loading :loading="therapiesLoading" />
    </section>
    <!-- Session Form -->
    <section class="session-form">
      <div class="placeholder" />
    </section>
    <!-- Session List -->
    <section class="session-list">
      <div class="placeholder" />
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sessions-index {
  display: flex;
  flex-direction: column;
}
.session-form {
  min-height: 30vh;
}
.session-list {
  min-height: 70vh;
}
.placeholder {
  height: 100%;
  width: 100%;
  border: 1px black solid;
}
</style>
