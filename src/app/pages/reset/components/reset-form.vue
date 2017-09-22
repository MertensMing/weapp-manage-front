<template>
  <div class="sign-form">
    <h3 class="title">重置密码</h3>
    <el-form direction="vertical">
      <el-form-item label="用户名">
        <el-input type="text" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit-btn syjx" size="large" html-type="submit">重置</el-button>
      </el-form-item>
      <el-form-item>
        <div class="links">
          <router-link to="/login" class="syjx">已有账号登录</router-link>
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