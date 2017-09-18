<template>
  <div class="login-form">
    <v-form direction="vertical" :model="formModel">
      <v-form-item label="用户名" prop="uname">
        <v-input type="text" placeholder="用户名" v-model="formModel.uname"></v-input>
      </v-form-item>
      <v-form-item label="密码" prop="pwd" required>
        <v-input type="password" placeholder="密码" v-model="formModel.pwd"></v-input>
      </v-form-item>
      <v-form-item style="margin-top:24px">
        <router-link to="/login">忘记密码？</router-link>.
        <router-link to="/signup">注册</router-link>
      </v-form-item>
      <v-form-item style="margin-top:24px">
        <v-button type="primary" @click="postLogin">登录</v-button>
      </v-form-item>
    </v-form>
  </div>
</template>

<style lang="scss">
.login-form {
  width: 200px;
}
</style>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        formModel: {
          uname: '',
          pwd: '',
        },
      }
    },
    methods: {
      postLogin() {
        axios({
          url:'/login.json',
          method: 'post',
          params: {
            _csrf: window._csrf
          },
          data: this.formModel,
          timeout: 1000
        })
      }
    }
  }
</script>