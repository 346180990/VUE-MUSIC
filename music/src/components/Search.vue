<template>
<el-container>
  <el-header>
    <Header></Header>
  </el-header>
  <el-main>
    <el-input v-model="input" style="width:250px" placeholder="请输入内容"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    <el-table
      :data="tableData" ref="multipleTable"
      style="width: 50%" @row-click="select">
      <el-table-column
        prop="title"
        label="歌名"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
         prop="artist"
        label="姓名"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        icon="el-icon-date"
        label="详情"
        width="50"
        :show-overflow-tooltip="true"> 
        <el-tooltip class="item" effect="dark" content="详情" placement="bottom-start">      
           <div class="el-icon-view"></div>
        </el-tooltip>
      </el-table-column>
      <el-table-column
        suffix-icon="el-icon-date"
        label="下载"
        width="50"
        :show-overflow-tooltip="true">
        <el-tooltip class="item" effect="dark" content="下载" placement="bottom-start">   
          <div class="el-icon-download"></div>
        </el-tooltip>
      </el-table-column>
    </el-table>
  </el-main>
  <el-footer>
<MusicPlay v-bind:idMusic="id" :tableDataList.sync="tableData" ></MusicPlay>

  </el-footer>
</el-container>
</template>

<script>
import axios from 'axios';
import MusicPlay from './MusicPlay';
import Header from './Header';
export default {
    name:'Search',
    data(){
        return{
            input:"",
            tableData:[],
            name:"",
            id:"",
            length:0,
        }
    },
    mount:function(){

    },
    methods:{
        search:function(){
            axios.get("https://autumnfish.cn/search?keywords="+this.input)
            .then(Response=>{
                if(Response.data.code==200){
                    //遍历获取的songs
                    if(this.tableData.length!=0){
                        this.tableData.splice(0);
                    }
                    Response.data.result.songs.filter((item,i)=>{
                        let music = new Object();
                        music.id = item.id;
                        music.title=item.name;
                        music.artist=item.artists[0].name;
                        music.src="https://music.163.com/song/media/outer/url?id="+item.id;
                        axios.get('http://musicapi.leanapp.cn/song/detail?ids='+item.id).then(
                          Response=>{
                            //这是图片
                            music.pic=Response.data.songs[0].al.picUrl;
                            //这个是会员歌
                            if(Response.data.privileges[0].fl==0){
                                
                            }
                          })
                        this.tableData.push(music);
                    });  
                           
                } 
            }
            ).catch(error=>{
                if(Response.data.code==400)
                    alert(error);
            })
        },       
        select:function(row, column, event){
           var Musicing=this.tableData.filter((item)=>{
             if(item.id==row.id){
               this.$store.commit("SaveMusicIding", item);
             }
           });
          this.$store.commit("SaveListSongs", this.tableData);         
        }
    },
    components:{MusicPlay,Header},

}

</script>

<style scoped>

</style>