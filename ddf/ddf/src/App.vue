<template>
  <div id="app">
  <el-container>
    <el-header style="background-color: #4c535a;">
    <img src="@/assets/logo.png" alt="" style="width: 40px; position: relative; top: 10px;">
    <span style="font size: 20px; margin-left: 15px;color: white"> Data Dummy Factory</span>
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
      <!-- <el-menu-item index="/config">
        <i class="el-icon-menu"></i>
        <span slot="title">配置</span>
      </el-menu-item> -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>SDTM</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/metadataset?domain=DM">DM</el-menu-item>
          <el-menu-item index="/metadataset?domain=AE">AE</el-menu-item>

        </el-menu-item-group>
       </el-submenu>
          <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>ADAM</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">ADSL</el-menu-item>
          <el-menu-item index="3-2">ADAE</el-menu-item>
        </el-menu-item-group>
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