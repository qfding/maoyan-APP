<template>
<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
<ul>
    <li class="box" v-for="(item,index) in playingList" :key='index' @click="checkInfoAction(item.id)">
        <div class="movieImg">
            <img :src="'/128.180'+item.img.split('/w.h')[1]" alt="">
        </div>
        <div class="introduce">
            <h2>
                {{item.nm}}
                <p v-if='item.version=="v3d imax"'><img src="../../assets/3Dimax.png" alt=""></p>
                <p v-if='item.version=="v3d"'><img src="../../assets/3D.png" alt=""></p>
                <p v-if='item.version=="v2d imax"'><img src="../../assets/2Dimax.png" alt=""></p>                                
            </h2>
            <h4 v-if='item.globalReleased==false'><span>{{item.wish}}</span>想看</h4>
            <h4 v-if='item.globalReleased==true'>观众评价 <span>{{item.sc}}</span></h4>
            <h4>主演：{{item.star}}</h4>
            <h4>{{item.showInfo}}</h4>
        </div>
        <div class="btn" v-if='item.globalReleased==true'>购票</div>
        <div class="btn blue" v-if='item.globalReleased==false'>预售</div>
    </li>
</ul>
</app-content>
</template>

<script>
import {getPlayingList, getMorePlayingList} from '../../services/movieService'
export default {
    data(){
        return {
            playingList: [],
            playingIDS: [],
            canLoadMore: true
        }
    },
    methods: {
        //加载更多数据
        loadMoreData(){
            //取出ids
            let ids = [...this.playingIDS];
            ids = ids.splice(this.playingList.length, 10);
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            getMorePlayingList(movieIds).then(result=>{
                this.playingList = [...this.playingList, ...result];
                //判断是否可以继续加载更多
                if(this.playingList.length >= this.playingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
            })
        },
        checkInfoAction(id){
            this.$router.push({
                name:'movieInfo',
                params:{
                    movieId:id
                }
            })
        }
    },
    created(){
        //初始化请求数据
        getPlayingList().then(({data, ids})=>{
            this.playingList = data;
            this.playingIDS = ids;
        })
    }
}
</script>

<style lang="scss" scoped>


.box{
    width: 100%;
    height: 1.14rem;
    padding:0 0.15rem;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    div{
        float: left;
        padding-top:0.12rem;
    }
    .movieImg{
        img{
            width: 0.64rem;
            height: 0.98rem;
        }
    }
    .introduce{
        width: 2.46rem;
        height: 0.88rem;
        margin-left:0.10rem;
        h2{
            font-size: 0.17rem;
            color: #333;
            font-weight: 700;
            padding-right: 0.05rem;
            flex-shrink: 1;
            margin-bottom: 0.07rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            p{
                margin-left:0.05rem;
                display: inline-block;
                img{
                    height: 0.14rem;
                }
            }
        }
        h4{
            font-size: 0.13rem;
            color: #666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top:0.06rem;
            span{
                font-weight: 700;
                color: #faaf00;
                font-size: 0.15rem;
            }
        }
    }
    .btn{
        width: 0.47rem;
        height: 0.27rem;
        line-height: 0.27rem;
        text-align: center;
        box-sizing: border-box;
        background-color: #f03d37;
        color: #fff;
        border-radius: 0.04rem;
        white-space: nowrap;
        font-size: 0.12rem;
        cursor: pointer;
        padding-top:0px;
        margin-top:0.4rem;
    }
    .blue{
        background-color: #3c9fe6!important;

    }
}
</style>

