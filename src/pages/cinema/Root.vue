<template>
<div class="page" id="cinema">
    <app-header title="影院"></app-header>
    <header class="cinemaHeader">
    <span class="city-icon" @click="goCityList()">
        {{city}}
    </span>
    <div class="search" @click="searchAction">
        <img src="../../assets/sou.png" alt="">
        搜影院
    </div>
    </header>

    <select-com :style="{top: '88px', bottom: '0'}"/>

    <!-- 内容部分 -->
    <keep-alive>
        <cinema/>
    </keep-alive>



    <router-view></router-view>    
</div>
</template>

<script>
import Cinema from '../../components/cinema/cinemas'
import Select from '../../components/select/Select'
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState(['city'])
    },
    methods:{
        searchAction(){
            this.$router.push({name:'cinemaSearch'})
        },
        //进入城市列表页面，选择城市
        goCityList(){
            this.$router.push('/movie/city-list');
        }
    },
    components: {
        'cinema': Cinema,
        'select-com':Select
    },
}
</script>

<style lang="scss" scoped>
.cinemaHeader{
    width: 100%;
    height: 0.44rem;
    border-bottom: 1px solid #e6e6e6;
    position: absolute;
    left: 0;
    top: 0.44rem;
    color: #666;
    font-size: 0.15rem;
    display: flex;
    background-color: #f5f5f5;
    .city-icon{
        width: 0.9rem;
        height: 0.2rem;
        text-align: center;
        line-height: 0.2rem;
        margin-top:0.1rem;
        margin-left:0.05rem;
        &::after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 6px solid #666;
            transform: translateY(4px);
        }
    }
    .search{
        width: 3.2rem;
        height: 0.3rem;
        background-color: #fff;
        font-size: 0.13rem;
        color: #b2b2b2;
        margin-left: 0.18rem;
        margin-top:0.05rem;
        border: .5px solid #e6e6e6;
        border-radius: 5px;
        margin-right: 0.15rem;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        img{
            width: 0.14rem;
            height: 0.14rem;
        }
    }
}
</style>
