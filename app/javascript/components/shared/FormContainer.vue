<template>
  <div class="container">
    <div class="login">
      <div class="error">
        <slot name="error"></slot>
      </div>
      <div class="form">
        <slot></slot>
      </div>
      <div class="buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 60%;
}

.form {
  margin: 2rem 0;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
