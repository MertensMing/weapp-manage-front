<template>
  <div class="reset-form">
    <v-form direction="vertical">
      <v-form-item label="用户名">
        <v-input type="text" placeholder="用户名" size="large"></v-input>
      </v-form-item>
      <v-form-item label="新密码" required>
        <v-input type="password" placeholder="密码" size="large"></v-input>
      </v-form-item>
      <v-form-item style="margin-top:24px">
        <router-link to="/login">已有账号登录</router-link>.
        <router-link to="/signup">注册</router-link>
      </v-form-item>
      <v-form-item style="margin-top:24px">
        <v-button type="primary" html-type="submit">重置</v-button>
      </v-form-item>
    </v-form>
  </div>
</template>

<style lang="scss">
.reset-form {
  width: 200px;
}
</style>

<script>
  export default {}
</script>