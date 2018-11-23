<template>
   <div id="meituan">
       <input type="text" placeholder="账户名/手机号/email" ref='user'>
       <input type="text" placeholder="请输入您的密码" ref='psd'>
       <div class="login" @click="toMineAction">登录</div>
       <div class="registered">
        <span class="left">立即登陆</span><span class="right">找回密码</span>
       </div>
       <h2>	&copy; 猫眼电影 客服电话 ：<span>400-670-5335</span></h2>
   </div>
</template>

<script>
export default {
    methods:{
        toMineAction(){
            console.log(this.$refs.user.value);
            console.log(this.$refs.psd.value);
            //发送ajax请求
            // 将登录成功的结果保存起来
            localStorage.setItem('token', 'afsdjasdfhaos');
            this.$router.push({
                name:'mine'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#meituan{
    font-size: 0.16rem;
    input{
        width: 90%;
        height: 0.3rem;
        display: block;
        margin:0 auto;
        margin-top:0.1rem;
        line-height: 0.3rem;
        font-size: inherit;
        font-weight: 400;
        border: none;
        &:focus{
            background-color: #eee;
            outline:none;
        }
    }
    .login{
        width: 90%;
        height: 0.4rem;
        background-color: #df2d2d;
        line-height: 0.4rem;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        margin:0.1rem auto;
    }
    .registered{
        width: 90%;
        overflow: hidden;
        color: #df2d2d;
        margin:0 auto;
        margin-bottom: 0.1rem;
        .left{
            float: left;
        }
        .right{
            float: right;
        }
    }
    h2{
        width: 80%;
        font-size: 0.14rem;
        margin:0 auto;
        text-align: center;
        span{
            color: #df2d2d;
        }
    }
}
</style>
