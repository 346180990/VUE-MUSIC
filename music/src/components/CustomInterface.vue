<template>
    <el-container>
  <el-header>
  </el-header>
  <el-main>
      <tr style="width: 10%; height: 10%">
        <td>
            <el-image     
            :src="url"
            fit="fill"></el-image>
        </td>
        <td>
        </td>
      </tr>
    <el-table 
    :data="musiclist" @cell-click="select" ref="multipleTable" id="eltable"
      style="width: 50%" >
      <el-table-column
        prop="title"
        label="歌名"
        width="200"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
         prop="artist"
        label="姓名"
        width="180"
        :show-overflow-tooltip="true">
      </el-table-column>
     <el-table-column
        width="100"
        prop="message"
        >
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope" >
        <el-button
          size="mini"
          type="primary"
          circle
          icon="el-icon-view"
          width="50"
          @click.stop="handleview(scope.$index, scope.row)"></el-button>
        <el-button
          size="mini"
          type="primary"
          circle
          icon="el-icon-download"
          width="50"
          @click.stop="handledownload(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>

    </el-table>
  </el-main>
  <el-footer>
<MusicPlay></MusicPlay>

  </el-footer>
</el-container>
</template>

<script>
import axios from 'axios';
import MusicPlay from './MusicPlay';
import saveAs from 'file-saver';
var FileSaver = require('file-saver');
export default {
    name:'CustomInterface',
    mounted(){
        let ModePlug=window.localStorage.getItem("ModePlug");
        let id=window.localStorage.getItem("Id");
        //模式1.喜欢的歌
        if(ModePlug=="1"){
            //挂载token
            // axios.interceptors.request.use(config=>{
            //     config.headers.Authorization=window.localStorage.getItem("Token");
            //     return config;
            // });
            //请求喜欢的歌
            axios.get("/api/user/playlist?uid="+id).then(
                Response=>{
                  console.log(Response);
                    this.url=Response.data.playlist[0].coverImgUrl+"?param=200y200";
                    let musiclistid=Response.data.playlist[0].id;
                    axios.get("/api/playlist/detail?id="+musiclistid).then(
                      async Response=>{
                            //音乐个数
                            //这里不能直接异步请求因为要动态滚轮加载页面，需要知道所有内容才行
                            // 使用promise函数
                             let musicsize=Response.data.playlist.trackCount;
                             //获取网易云音乐数据.这里需要等待网易云数据
                             //因为请求是异步这个直接获取就会出问题
                             const promises = Response.data.playlist.trackIds.map(element =>this.functionWangyiun(element));

                             await Promise.all(promises).then(
                                Response=>{
                                  console.log(Response);
                                  Response.forEach(element=>{                
                                  let music={};
                                  music.id = element.data.songs[0].id;
                                  music.title=element.data.songs[0].name;
                                  music.artist=element.data.songs[0].ar[0].name;
                                  music.src="https://music.163.com/song/media/outer/url?id="+element.data.songs[0].id;
                                  //这是图片
                                  music.pic=element.data.songs[0].al.picUrl;
                                  //这个是会员歌
                                  //console.log(Response.data.songs[0].al.name+"---"+Response.data.privileges[0].fl);
                                  music.message="";
                                  if(element.data.privileges[0].fl==0){
                                    music.message="没有资源";
                                        //使用gumi
                                        axios.get("/gumi/search?keyword="+music.title).then(
                                          Response=>{
                                            //获取没会员的歌详情
                                            //只要前三个
                                            for(var i=0;i<3;i++){
                                              // 歌手
                                              let artistname=Response.data.data.list[i].artists[0].name;
                                              // 歌名
                                              let name=Response.data.data.list[i].name;
                                                if(artistname==music.artist && name==music.title)
                                                {
                                                  music.src=Response.data.data.list[i].url;
                                                  music.message="from gumi1";
                                                  return false;
                                                }
                                                //判断相似的
                                                else if(name.indexOf(music.title)!=-1 || music.title.indexOf(name)!=-1 && artistname==music.artist)
                                                {
                                                  music.title=name;
                                                  music.src=Response.data.data.list[i].url;
                                                  music.message="from gumi2";
                                                  return false;
                                                }      
                                            }
                                          }
                                        )
                                    }
                                    this.tablemiddle.push(music);
                                  });
                              }
                          )
                             //Response.data.playlist.trackIds.forEach(element =>this.functionWangyiun(element));
                            // 这里使用滚轮动态渲染
                              if(this.currentPage==1 && musicsize>=15){
                                this.musiclist=this.musiclist.concat(this.tablemiddle.slice(0,15));
                              }
                              //console.log(document.querySelector("#eltable"));
                              window.addEventListener('scroll', () => {
                              //可视区域 
                              // var inner = document.querySelector('#eltable');
                              //   console.log(document.documentElement.scrollTop);
                              //  console.log( document.documentElement.scrollHeight);
                              //   console.log(document.documentElement.clientHeight);                        
                              //  console.log( inner.clientHeight);
                              // let clientHeight = this.clientHeight;
                              // // 滚条上面
                              // let scrollTop = this.scrollTop;
                              // // 总高
                              // let scrollHeight = this.scrollHeight;
                              // 页数计算
                              //console.log(document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight);
                              let pagesize=(8+musicsize)/22;
                              if(document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight<=1){
                                  if(this.currentPage<Math.floor(pagesize)){
                                    this.musiclist=this.musiclist.concat(this.tablemiddle.slice(15+22*(this.currentPage-1),15+22*this.currentPage));   
                                  }else if(this.currentPage==Math.floor(pagesize)){
                                    this.musiclist=this.musiclist.concat(this.tablemiddle.slice(15+22*(this.currentPage-1),musicsize));
                                  }
                                  ++this.currentPage;
                              }
                              },true);   
                         }
                    )
                }
            )
            // 模式2.每日推荐
        }else if(ModePlug=="2"){          
            //挂载cookie
            axios.defaults.withCredentials=true;  
            axios.get("https://autumnfish.cn/recommend/songs").then(
              Response=>{
                this.url=Response.data.recommend[0].album.blurPicUrl+"?param=200y200";
                Response.data.recommend.forEach(element=>{
                  let music = new Object();
                  music.id = element.id;
                  music.title=element.name;
                  music.artist=element.artists[0].name;
                  music.src="https://music.163.com/song/media/outer/url?id="+element.id;
                  music.pic=element.album.blurPicUrl;
                  music.message="";
                  console.log(music.title);
                if(element.privilege.fl==0){
                  music.message="没有资源";
                      //使用gumi
                      axios.get("/gumi/search?keyword="+music.title).then(
                        Response=>{
                          //获取没会员的歌详情
                          //只要前三个
                          for(var i=0;i<3;i++){
                            // 歌手
                            let artistname=Response.data.data.list[i].artists[0].name;
                            // 歌名
                            let name=Response.data.data.list[i].name;
                              if(artistname==music.artist && name==music.title)
                              {
                                music.src=Response.data.data.list[i].url;
                                music.message="from gumi1";
                                return false;
                              }
                              //判断相似的
                              else if(name.indexOf(music.title)!=-1 || music.title.indexOf(name)!=-1 && artistname==music.artist)
                              {
                                music.title=name;
                                music.src=Response.data.data.list[i].url;
                                music.message="from gumi2";
                                return false;
                              }      
                          }
                        }
                      )
                  }
                  this.musiclist.push(music);
                });
              }
            )

        }
    },
    data(){
        return{
            url:"",
            musiclist:[],
            urlimgfrom:"",
            tablemiddle:[],
            currentPage :1,
            music:{},
        }
    },
    methods:{
        select:function(row, column, event){
           var Musicing=this.musiclist.filter((item)=>{
             if(item.id==row.id){
               this.$store.commit("SaveMusicIding", item);
             }
           });
          this.$store.commit("SaveListSongs", this.musiclist);         
        },
        functionWangyiun(element){
          {
             return axios.get("/autumnfish/song/detail?ids="+element.id);
             
          }
        },
        handledownload(index, row){
          //网易云https://music.163.com/
          //咕咪http://tyst.migu.cn/

          axios.get(row.src).then({

          })
          const elink = document.createElement('a')
          elink.download = row.title+".mp3"
          elink.style.display = 'none'
          elink.href = row.src;
          document.body.appendChild(elink)
          elink.click()
        },
        handleview(index, row){
          console.log(index, row);
        },

    },
    components:{MusicPlay},
}
</script>

<style scoped>

</style>