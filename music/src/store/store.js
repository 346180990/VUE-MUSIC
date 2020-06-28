import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    token: '',
    cookie:"",
    id:'',
    name:'',
    musicIding:{},
    listSongs:[],
    modePlug:"",
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    saveToken (state, data) {
      //保存到state中
      state.token = data;
      window.localStorage.setItem("Token", data);
    },
    // cookie
    saveCookie (state, data) {
      //保存到state中
      state.cookie = data;
      window.localStorage.setItem("Cookie", data);
    },
    //修改id
    saveId (state, data) {
      //保存到state中
      state.id = data;
      window.localStorage.setItem("Id", data);
    },
    //修改name
    saveNickName (state, data) {
      //保存到state中
      state.name = data;
      window.localStorage.setItem("Name", data);
    },
    //播放列表正在播放的音乐
    SaveMusicIding(state,data){
      state.musicIding=data;
    },
    //播放列表
    SaveListSongs(state,data){
      state.listSongs=data;
    },
    //插入插件播放模式
    SaveModePlug(state,data){
      state.modePlug=data;
      window.localStorage.setItem("ModePlug", data);
    }
  },
  getters: {
    //get方法
        getMusicIding: state => state.musicIding
    },
    getters: {
      //get方法
        getListSongs: state => state.listSongs
    },
    getters:{
      getModePlug: state => state.modePlug
    }
});

 
export default store;