<template>
  <div class="sign-form">
    <h3 class="title">注册账号</h3>
    <el-form direction="vertical">
      <el-form-item label="用户名">
        <el-input type="text" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" html-type="submit" class="submit-btn syjx">注册</el-button>
      </el-form-item>
      <el-form-item>
        <div class="links">
          <router-link class="syjx" to="/login">使用已有账号登录</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
  @import '../../../common/style/sign/index.scss';
</style>

<script>
  export default {}
</script>