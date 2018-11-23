<template>
<div class="page subpage" id="login">
    
    <app-header title="猫眼电影">
            <div slot='left' @click="backAction">&lt;</div> 
        </app-header>
    <app-content :style="{top: '44px', bottom: 0,'background-color':'#fff'}">
        <nav class="nav">
            <li v-for="(navItem, index) in navList" :key="index"
                :class="{active: navIndex==index}" @click="navAction(index)">
               {{navItem}}
            </li>
        </nav>

        <keep-alive>
            <Meituan v-if="navIndex==0"/>
            <Phone v-if="navIndex==1"/>
        </keep-alive>
    </app-content>
</div>
</template>

<script>
import Meituan from '../../components/login/meituan'
import Phone from '../../components/login/phone'
export default {
    components: {
        'Meituan': Meituan,
        'Phone': Phone,
    },
    data(){
        return {
            navList: ['美团账户登录', '手机验证登录'],
            navIndex: 0
        }
    },
    methods: {
        backAction(){
            this.$router.back();
        },
        loginAction(){
            console.log(this.$refs.user.value);
            console.log(this.$refs.psd.value);
            //发送ajax请求
            // 将登录成功的结果保存起来
            localStorage.setItem('token', 'afsdjasdfhaos');
            //成功
            this.$router.push('/mine');
        },
        navAction(index){
            this.navIndex = index;
        },
    }
}
</script>
<style lang="scss" scoped>
#login{
    background: #fff;
    .nav{
        width: 100%;
        display: flex;
        li{
            flex: 1;
            text-align: center;
            line-height: 44px;
            font-weight: 400;
            border-bottom: 4px solid #d6d6d6;            
            &.active{
                color: #f03d37;
                border-bottom: 4px solid #f03d37;
            }
        }
    }

}
</style>

