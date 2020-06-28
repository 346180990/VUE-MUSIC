<template>
    <div>
        <el-row style="text-align: center;margin-left:5px">
            <h2>小熊音乐</h2>
            <div class="block"><el-avatar :size="80" :src="url"></el-avatar></div>                      
        </el-row>
        <el-row>
        <el-form label-width="70px">
            <el-row type="flex" justify="center">
                <el-form-item label="手机号">
                    <el-col>    
                        <el-input @focus="focusPhone" @blur="blur" @change="changePhone" placeholder="手机号" style="width:200px;height:20px" v-model="phone"/>                  
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row type="flex" justify="center">
                <el-form-item label="密码">
                    <el-col > 
                        <el-input @focus="focusPassword" @blur="blur" @input="inputPassword" show-password placeholder="密码" style="width:200px;height:20px" v-model="password"/>
                    </el-col>
                </el-form-item>
            </el-row>
             <el-row type="flex" justify="center">
                <el-form-item>
                     <el-button @click="login" type="primary" class="login-btn">登录</el-button>
                     <el-button>注册</el-button>
                     <el-button type="success">直接进入</el-button>
                </el-form-item>
            </el-row>
        </el-form>
       </el-row> 
    </div>
</template>

<script>
import axios from 'axios';
export default {
    
    name : "login",
    data(){
        return{
            phone:"",
            password:"",
            url: '../static/neutral.png',
            Message:"",
        }
    },
    updated(){
             
    },
    methods:{
        login:function(){

            console.log(this.phone+this.password);
            axios.get("/autumnfish/login/cellphone?phone="+this.phone+"&password="+this.password)
            .then(Response=>
                {
                    console.log(Response);
                    if(Response.data.code==200){
                        //保存token
                        var token=Response.data.token;
                        this.$store.commit("saveToken", token);
                         //保存cookie
                         var cookie=Response.data.cookie;
                         this.$store.commit("saveCookie", cookie);
                         //保存用户id
                         var id=Response.data.account.id;
                         this.$store.commit("saveId", id);
                         //保存用户昵称
                         var name=Response.data.profile.nickname;
                         this.$store.commit("saveNickName", name);
                         //保存用户头像
                         this.url=Response.data.profile.avatarUrl;
                         console.log(this);
                        this.$router.push('/home');
                        console.log('登陆成功');
                    }
                }
            ).catch(error=>{
                console.log(error);
                alert('账号或密码错误');
              }
            )
        },
        focusPhone:function(){
            this.url="../static/active.png"
        },
        blur:function(){
            this.url="../static/neutral.png"
        },
        focusPassword:function(){
            this.url="../static/peek.jpg"
        },
        inputPassword:function(){
            this.url="../static/shy.jpg"
        },
        changePhone:function(){
                if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
                    alert("手机号码有误，请重填");  
                    return false; 
                 } 
        },
    },
}
</script>

<style scoped>

</style>