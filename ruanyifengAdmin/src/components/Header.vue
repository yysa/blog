<template>
    <div >
        <div class="header">
            <h1>惜时博客</h1>
            <div class="header-box">
                <div class="img">
                    <img :src="URL.staticUrl+JSON.parse(localStorage.getItem('user_infor')).head_pic" alt="" v-if="isLogin">
                </div>
                <div class="login-box" v-if="!isLogin">
                    <a @click="show = true">登录</a>|
                    <a>注册</a>
                </div>
                <div class="login-box" v-if="isLogin">
                    <a>{{JSON.parse(localStorage.getItem('user_infor')).nick}}</a>|
                    <a @click="out">退出登录</a>
                </div>
            </div>
        </div>
                <el-dialog title="用户登录" :visible.sync="show">
                <el-form  status-icon  label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="pass">
                        <el-input v-model="user.user_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="checkPass">
                        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button @click="cancle">取消</el-button>
                    </el-form-item>
                </el-form>    
            </el-dialog>
        
    </div>
</template>

<script>
import {login,checkLogin} from '../config/data'
import URL from '../config/url'
export default {
    data(){
        return {
            show: false,
            user: {
                user_name:'',
                password:''
            },
            localStorage:window.localStorage,
            JSON:JSON,
            isLogin:false,
            URL:URL
        }
    },
    async created(){
        let check = await checkLogin();
        if(check.errCode == 10020){
            this.show = true;
        }else{
            this.isLogin = true;
        }  
    },
    methods:{
        out(){
            this.localStorage.removeItem('token');
            this.localStorage.removeItem('user_infor');
            this.isLogin = false;
        },
        cancle(){
            this.show = false;
        },
        async login(){
            let loginMsg = await login(this.user);
            if(loginMsg.user_infor){
                this.show = false;
                this.localStorage.setItem('token',loginMsg.token);
                this.localStorage.setItem('user_infor',JSON.stringify(loginMsg.user_infor));
                this.$notify({
                    title: '成功',
                    message: loginMsg.errMsg.errMsg,
                    type: 'success',
                    duration:2000,
                    onClose:()=>{
                        location.reload();
                    }
                });
            }else{
                this.$notify.error({
                    title: '错误',
                    message: loginMsg.errMsg.errMsg
                });
            }
        }
    },
    watch:{
        async '$route' (){
            //防止在使用过程中token过期
            let check = await checkLogin();
            if(check.errCode == 10020){
                this.show = true;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .header{
        height: 60px;
        background-color: rgb(28,30,37);
        position: fixed;
        width: 100%;
        z-index: 100;
        h1{
            color:#fff;
            font-size: 20px;
            line-height: 60px;
            float: left;
            margin-left: 55px;
        }
        .header-box{
            float: right;
            height: 100%;
            margin-right: 40px;
            .img{
                border-radius: 100%;
                overflow: hidden;
                width: 50px;
                height: 50px;
                border: 2px #fff solid; 
                margin-right: 20px;
                display: inline-block;
                vertical-align: middle;
            }
            
        }
        .header-box:after{
                content:'';
                height: 100%;
                display: inline-block;
                vertical-align: middle;
        }
        .login-box{
            display: inline-block;
            color:#f0f0f0;
            a{
                color:#f0f0f0;
                cursor: pointer;
            }
        }
        
    }
</style>
