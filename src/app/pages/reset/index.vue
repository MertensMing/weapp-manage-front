<template>
  <div class="sign-container">
    <reset-form />
  </div>
</template>

<script>
  import ResetForm from './components/reset-form'
  export default {
    components: {
      ResetForm
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
