<template>
  <div class="sign-form">
    <h3 class="title">用户登陆</h3>
    <el-form direction="vertical" :model="formModel">
      <el-form-item label="用户名" prop="uname">
        <el-input type="text" placeholder="请输入用户名" v-model="formModel.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" placeholder="请输入密码" v-model="formModel.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" class="submit-btn syjx" @click="postLogin">登录</el-button>
      </el-form-item>
      <el-form-item>
        <div class="links">
          <router-link to="/reset" class="syjx">忘记密码？</router-link>
          <router-link to="/signup" class="syjx">注册</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
  @import '../../../common/style/sign/index.scss';
</style>

<script>
  import request from 'request'
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
        request
          .post('/login.json', this.formModel)
          .then(res => console.log('res', res))
      }
    }
  }
</script>