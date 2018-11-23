<template>
    <div id="phone">
        <div class="phoneNum">
            <input type="text" placeholder="请输入手机号" ref='phoneNumber' @input="numberChange">
            <div class="getCode" ref="getCode">
                获取验证码
            </div>
        </div>
        <div class="code">
            <input type="text" placeholder="请输入短信验证码">
        </div>
        <div class="login">
            登录
        </div>
        <div class="registered">
        <span class="left">立即登陆</span><span class="right">找回密码</span>
       </div>
       <h2>	&copy; 猫眼电影 客服电话 ：<span>400-670-5335</span></h2>
    </div>
</template>

<script>
export default {
    created(){
        
    },
    methods:{
        numberChange(){
            if(this.$refs.phoneNumber.value.length>11){
                this.$refs.getCode.style.background='#fff';                
                this.$refs.getCode.style.color='#df2d2d';
                this.$refs.getCode.style.border='1px solid #df2d2d';                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#phone{
    font-size: 0.16rem;
    .phoneNum{
        width: 90%;
        margin:0 auto;
        overflow: hidden;
        height: 0.45rem;
        padding:0.1rem 0;
        input{
            width: 60%;
            height: 0.2rem;
            float: left;
            border: none;
            background-color: #fff;            
            &:focus{
            background-color: #eee;
            outline:none;
            }
        }
        .getCode{
            width: 30%;
            color: #999;
            height: 0.25rem;
            float: right;
            background-color: #dcdcdc;
            text-align: center;
            line-height: 0.25rem;
            font-size: 0.14rem;
        }
    }
    .code{
         width: 90%;
        margin:0 auto;
        input{
            width: 100%;
             height: 0.3rem;
             background-color: #fff;
             border: none;
            &:focus{
            background-color: #eee;
            outline:none;
        }

        }
       
    }  
    .login{
        width: 90%;
        height: 0.4rem;
        background-color: #dcdcdc;
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
