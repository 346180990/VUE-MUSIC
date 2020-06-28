<template>
    <div>
 <el-menu class="el-menu-demo" mode="horizontal" >
  <el-menu-item index="1" route='/Home'>
    <router-link to='/Home'>主页</router-link>
  </el-menu-item>
  <el-menu-item index="2">
      <router-link to='/Search'>查找 </router-link>
  </el-menu-item>
  <el-menu-item index="3" ><router-link to='/CustomPlug'>自定义插件 </router-link></el-menu-item>
  <el-menu-item index="4"><router-link to='/Comment'>评论窗口 </router-link></el-menu-item>
  <el-menu-item index="5">设置</el-menu-item>
</el-menu>
    </div>
</template>

<script>
export default {
    name : 'Header',
}
</script>

<style scoped>

</style>