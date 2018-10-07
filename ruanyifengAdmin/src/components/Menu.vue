<template>
    <div class="menu">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章模块</span>
        </template>
          <el-menu-item index="1-1" route="/">文章</el-menu-item>
          <el-menu-item index="1-2" route="/articleCategory">文章分类</el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>评论模块</span>
        </template>
          <el-menu-item index="2-1" route="/comment">评论</el-menu-item>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户模块</span>
        </template>
          <el-menu-item index="3-1" route="/users">用户</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告模块</span>
        </template>
          <el-menu-item index="4-1" route="/advertisement">广告</el-menu-item>
          <el-menu-item index="4-2" route="/advertisementCategory">广告分类</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>网站信息模块</span>
        </template>
          <el-menu-item index="5-1" route="/infor">网站信息</el-menu-item>

      </el-submenu>
    </el-menu>
    </div>
</template>

<script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss" scoped>
    .menu{
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        height: 100%;
        .el-menu-vertical-demo{
            height: 100%;
            padding-top: 60px;
            background-color: #23262E!important;
        }
    }
</style>