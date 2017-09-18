<template>
  <div class="sign-container">
    <login-form></login-form>
  </div>
</template>

<script>
  import LoginForm from './components/login-form'
  export default {
    name: 'login',
    components: {
      LoginForm
    }
  }
</script>

<style lang="scss">
.sign-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
