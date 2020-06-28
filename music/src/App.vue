<template>
<div id="app">
    <router-link to='/Login'>登录 </router-link>
    <router-link to='/Search'>查找 </router-link>
    <router-link to='/Home'>主页 </router-link>
    <router-link to='/OpenPlay'>弹窗 </router-link>
    <router-link to='/MusicPlay'>音乐播放 </router-link>
    <router-link to='/CustomPlug'>自定义插件 </router-link>
    <router-link to='/CustomInterface'>自定义界面 </router-link>
    <router-link to='/Comment'>评论窗口 </router-link>
    <router-link to='/Header'>头部 </router-link>
    <router-view/>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
