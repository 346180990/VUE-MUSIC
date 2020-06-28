import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Search from '../components/Search';
import OpenPlay from '../components/OpenPlay';
import MusicPlay from '../components/MusicPlay';
import CustomPlug from '../components/CustomPlug';
import CustomInterface from '../components/CustomInterface';
import Comment from '../components/Comment';
import Login from '../components/Login';
import Header from '../components/Header';

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/Login'},//默认路由
    {path: '/Login',component: Login},
    {path: '/Home',component: Home},
    {path: '/Search',component: Search},
    {path: '/Home',component: Home},
    {path: '/OpenPlay',component: OpenPlay},
    {path: '/MusicPlay',component: MusicPlay},
    {path: '/CustomPlug',component: CustomPlug},
    {path: '/CustomInterface',component: CustomInterface},
    {path: '/Comment',component: Comment},
    {path: '/Header',component: Header},
  ]
})
