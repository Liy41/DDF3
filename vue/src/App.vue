<template>
  <div id="app">
  <el-container>
    <el-header style="background-color: #4c535a;">
    <img src="@/assets/logo.png" alt="" style="width: 40px; position: relative; top: 10px;">
    <span style="font size: 20px; margin-left: 15px;color: white"> 手拉手带小白做毕设</span>
    </el-header>
  </el-container> 

 <el-container>
    <el-asider style="overflow: hidden; min-height: 100vh; background-color: #545c64; width: 200px;">
 <el-menu default-active="$route.path" router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/admin">管理员信息</el-menu-item>
          <el-menu-item index="2-2">用户信息</el-menu-item>
        </el-menu-item-group>
       </el-submenu>
          <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>信息管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="3-1">xx信息</el-menu-item>
          <el-menu-item index="3-2">yy信息</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
    </el-menu>
    </el-asider>
    <el-main>
        <router-view/>
    </el-main>
 </el-container>
  </div>
</template>
<style>
.el-menu{
  border-right: none!important;
}

</style>>