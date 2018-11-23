<template>
<app-content :style="{top: '88px', bottom: '49px'}" @loadmoreComing="loadMoreComingData" :canLoadMoreComing="canLoadMoreComing">
<div class="coming">
    <div class="expected">
        <p>近期最受期待</p>
        <h-scroll class="expected-list">
            <li  class="expected-item" v-for="item in expectedList" :key="item.id"> 
                <img :src="'/128.180'+item.img.split('/w.h')[1]"/>
                <p>{{item.nm}}</p>
                <h3>{{item.comingTitle.split(" ")[0]}}</h3>
                <h4>{{item.wish}}人想看</h4>
            </li>
        </h-scroll>
    </div>

    <div v-for="(list, key) in comingMap" :key="key" class="expectedMovieShow">
        <p>{{key}}</p>
        <ul>
            <li class="box" v-for="item in list" :key='item.id'>
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
                <div class="btn" v-if='item.showst==1'>想看</div>
                <div class="btn blue" v-if='item.showst==4'>预售</div>
            </li>
        </ul>
    </div>

</div>
</app-content>
</template>


<script>
import {getComingList, getMostExpectedData,getMoreComingList} from '../../services/movieService'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            comingMap: {},
            expectedList: [],
            comingCount:10,
            canLoadMoreComing: true            
        }
    },
    computed: {
        ...mapState(['cityID'])
    },
    watch: {
        cityID(){
            // console.log('id变化了');
            this.initData();
        }
    },
    created(){
        this.initData();        
    },
    methods:{
        //加载更多数据
        loadMoreComingData(){
            //取出ids
            let ids = [...this.movieIds];
            ids = ids.splice(this.comingCount, 10);
            this.comingCount+=10;
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMoreComing = false;
            getMoreComingList(movieIds,this.cityID).then(result=>{
                this.comingMap=Object.assign(this.comingMap,result)
            //    console.log(this.comingMap)
                //判断是否可以继续加载更多
                if(this.comingCount >= this.movieIds.length){
                    //加载完毕
                    this.canLoadMoreComing = false;
                }else{
                    //还可以继续加载
                    this.canLoadMoreComing = true;
                }
            })
        },
        initData(){
            getComingList(this.cityID).then(result=>{
            this.comingMap = result.dataMap;
            this.movieIds=result.movieIds;
            // console.log(this.movieIds)
            
            })
            getMostExpectedData(this.cityID).then(result=>{
                this.expectedList = result;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.coming{
    font-size: 0.16rem;
}
.expected{
    padding: 0.12rem 0 0.12rem 0.15rem;
    background-color: #fff;
    margin-bottom: 0.1rem;
    p{
        margin: 0 0 12px;
        font-size: 14px;
        color: #333; 
    }
    .expected-item{
        display: inline-block;
        width: 0.85rem;
        height: 1.57rem;
        overflow: hidden;
        margin-right: 0.1rem;
        position: relative;
        img{
            width: 0.85rem;
            height: 1.15rem;
        }
        p{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin:0.05rem 0 0.05rem 0rem;
        }
        h3{
            margin: 0;
            font-size: 0.12rem;
            color: #999;
        }
        h4{
            position: absolute;
            top:1rem;
            left: 0.04rem;
            color: #faaf00;
            font-size: 0.11rem;
            font-weight: 600;
        }
    }
}
.expectedMovieShow{
    background-color: #fff;
    p{
        padding: 12px 15px 0;
        margin: 0;
        font-size: 14px;
        color: #333;
    }
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
        background-color: #faaf00;
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
}
</style>