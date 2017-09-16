<template>
  <manage-layout>
    <router-view></router-view>
  </manage-layout>
</template>

<script>
  import ManageLayout from '../../common/components/Layout.vue'
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      ManageLayout
    }
  }
</script>