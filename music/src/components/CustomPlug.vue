<template class="classCss">
<el-container>
  <el-header>
    <Header></Header>
  </el-header>
  <el-main>
<div class="container">
  <div class="item item-1" @click="onclickLike">喜欢音乐</div>
  <div class="item item-2" @click="onclickEveryday">每日推荐</div>
  <div class="item item-3" v-show="false">3</div>
  <div class="item item-4" v-show="false">4</div>
  <div class="item item-5" v-show="false">5</div>
  <div class="item item-6" v-show="false">6</div>
  <div class="item item-7" v-show="false">7</div>
  <div class="item item-8" v-show="false">8</div>
  <div class="item item-9" v-show="false">9</div>
</div>
  </el-main>
  <el-footer>
<MusicPlay ></MusicPlay>

  </el-footer>
 </el-container> 
</template>

<script>
import MusicPlay from './MusicPlay';
import Header from './Header';
import axios from 'axios';
export default {
    name : "Home",
    methods:{
      onclickLike:function(){   
        this.$store.commit("SaveModePlug","1");        
        this.$router.push('/CustomInterface');
      },
      onclickEveryday:function(){
        if(this.$store.state.id==""){
          alert("没登录")
          this.$router.push('/login');
          return;
        } 
        this.$store.commit("SaveModePlug", "2");
        this.$router.push('/CustomInterface');
      }
    },
   components:{MusicPlay,Header}
};

</script>

<style scoped>
.classCss{
background-color: #2b2b2b;
}

.container {
  width:50%;
  height:100%;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}

.item {
  font-size: 4em;
  text-align: center;
  border: 1px solid #e5e4e9;
}

.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
}

.item-9 {
  background-color: #4dc7ec;
}

</style>