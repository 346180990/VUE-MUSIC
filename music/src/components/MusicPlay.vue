<template>
  <div class="footer" style="height:20%,width:100%">
    <aplayer  :music.sync="music" :list.sync="musicList" :fixed="true" :listFolded="true" ref="player" v-if="update" />
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
import axios from "axios";
export default {
  name: "MusicPlay",
    mounted() { 
         
    }, 
  data() {
    return {
        update:true, 
        musicList:[], 
        music:{
        title: "彩色的黑（翻自 周深 陈乐一）（翻自 吉克隽逸）",
        pic:
          "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
        src: "https://music.163.com/song/media/outer/url?id=1402414941",
        artist: "吉克隽逸"
        } 
    };
  },
  method: {

  },
  computed: {
    getmusicIding() {
      return this.$store.state.musicIding;
    },
    getListSongs(){
      return this.$store.state.listSongs;
    } 
    
  },
 
  watch: {
      getmusicIding: {
      handler(newValue, oldValue) {
        this.music=newValue;
        console.log(this.music);
        this.update = false
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
            this.update = true
        })
      }
    },
    getListSongs:function(newValue,olderValue){
      this.musicList=newValue;
          this.update = false;
          // 在组件移除后，重新渲染组件
          // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
          this.$nextTick(() => {
            this.update = true;
          });
    },     
    immediate: true,
    deep: true
  },

   components: { Aplayer }
};
</script>

<style scoped>
.footer{

height: 100px;

width: 100%;

position: fixed;

bottom: 0;

}
</style>