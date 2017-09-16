<template>
  <div>
    <v-layout class="manage-layout">
      <v-sider class="manage-sider">
        <div>
          <a class="manage-logo" href="/">
            <img class="img" src="http://ov9z0zlev.bkt.clouddn.com/assets/images/common/logo.svg" alt="logo">
          </a>
        </div>
        <v-menu
          theme="light"
          mode="inline"
          :expand="true"
          :data="inlineMenuData"></v-menu>
        <div class="manage-user">
          <v-popover class="user-info-pop" trigger="hover">
              <div class="user-name">Mertens</div>
              <div slot="content">
                <div class="info">
                  <img class="img" src="http://ov9z0zlev.bkt.clouddn.com/assets/images/common/logo.svg" alt="">
                  <p>Mertens</p>
                </div>
                <v-button type="dashed">退出登录</v-button>
              </div>   
          </v-popover>
        </div>
      </v-sider>
      <slot>
        <v-layout>
          <v-header>Header</v-header>
          <v-content>Content</v-content>
        </v-layout>
      </slot>
    </v-layout>
  </div>
</template>

<style lang="scss">
  @import '../style/mixins.scss';
  .manage-layout {
    height: 100vh;
    .ant-layout-header {
      background-color: #fff;
      padding: 0 20px;
    }
    .ant-layout-content {
      background-color: #fafafa;
      padding: 20px;
    }
    .manage-sider {
      background-color: #fff;
      flex: 0 0 150px !important;
      border-right: 1px solid #eee;
      position: relative;
    }
    .manage-logo {
      @include content-center;
      height: 80px;
      .img {
        height: 40px;
        width: 40px;
      }
    }
    .manage-user {
      @include content-center;
      position: absolute;
      height: 60px;
      width: 100%;
      bottom: 0;
      border-top: 1px solid #eee;
      .user-name {
        line-height: 2;
        cursor: pointer;
        color: #333;
        font-weight: bold;
      }
      .user-info-pop {
        .info {
          @include content-center;
          flex-direction: column;
          border-bottom: 1px solid #eee;
          margin-bottom: 15px;
          line-height: 3;
          color: #333;
          .img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>

<script>
export default {
  name: 'manage-layout',
  data: () => ({
    inlineMenuData: [
      {
        name: '概览',
        icon: 'home',
      },
      {
        name: '内容管理',
        icon: 'edit',
        children: [
          {
            name: '电视剧'
          },
          {
            name: '电影',
            selected: true
          },
          {
            name: '音乐'
          },
          {
            name: '动画'
          }
        ]
      },
      {
        name: '设置',
        icon: 'setting',
      }
    ]
  })
}
</script>