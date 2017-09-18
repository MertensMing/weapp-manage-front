<template>
  <div class="sign-container">
    <signup-form></signup-form>
  </div>
</template>

<script>
  import  SignupForm from './components/signup-form'
  export default {
    components: {
      SignupForm
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
