<template>
<app-content :style="{top: '1.28rem', bottom: '49px'}"  @loadmore="loadMoreData" :canLoadMore="canLoadMore">
<ul class="cinemaShow">
    <li v-for='(item,index) in cinemaList' :key='index' class="cinemaInfo"
    @click="checkCinemaAction(item.id)"
    >
        <p>
        {{item.nm}}
        <span>{{item.sellPrice}}<span>元起</span></span>
        </p>
        <div class="leftLittle">
            <h3>{{item.addr}}</h3><span>{{item.distance}}</span>
        </div>
        <div class="leftLittle">
            <div class="type blue" v-show="item.tag.allowRefund==1">退</div>
            <div class="type blue" v-show="item.tag.endorse==1">改签</div>
            <div class="type yellow" v-show="item.tag.snack==1">小吃</div>
            <div class="type yellow" v-show="item.tag.vipTag">折扣卡</div>
            <div class="type blue" v-show='item.tag.hallType'>CGS中国巨幕厅</div>
            <div class="type blue" v-show='item.tag.hallType'>杜比全展厅</div>
        </div>
    </li>
</ul>
</app-content>
</template>

<script>
import {getCinemaList} from '../../services/cinemaService'
import {mapState,mapGetters} from 'vuex'
export default {
    data(){
        return {
            cinemaList:[],
            canLoadMore: true,
            offset:0,
        }
    },
    computed: {
        ...mapState(['cityID']),
        ...mapGetters(['date'])
    },
    watch: {
        cityID(){
            // console.log('id变化了');
            this.initData();
        }
    },
    methods: {
        //加载更多数据
        loadMoreData(){
            this.offset+=20
            // 发送请求
            this.canLoadMore = false;
            getCinemaList(this.offset,this.cityID).then(result=>{
                this.cinemaList = [...this.cinemaList, ...result];
                //判断是否可以继续加载更多
                if(this.cinemaList.length >= 500){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
            })
        },
        initData(){
            //初始化请求数据
            getCinemaList(this.offset,this.cityID,this.date).then((data)=>{
                this.cinemaList=data;
                console.log(data);
            })
        },
        checkCinemaAction(cinemaId){
            this.$router.push({
                name:'cinemaInfo',
                params:{
                   cinemaId,
                }
            })
        }

    },
    created(){
       this.initData();
    }
}
</script>

<style lang="scss" scoped>

.cinemaShow{
    padding-left: 0.15rem;
    border-top: 1px solid #e6e6e6;
    background-color: #fff;
    font-size: 0.14rem;
    color: #777;
    .cinemaInfo{
        height: 1.03rem;
        padding: 0.15rem 0.15rem 0.15rem 0;
            border-bottom: 1px solid #e5e5e5;
        
        p{
            font-size: 0.16rem;
            color: #000;
            margin-bottom: 0.06rem;
            display: -webkit-box;
            display: flex;
            span{
                margin-left:0.1rem;
                font-size: 0.17rem;
                color: #ef4238;
                span{
                    font-size: 0.11rem;
                    margin-left:0rem;
                    color: #ef4238;
                }
            }
        }
        .leftLittle{
            overflow: hidden;
            margin-left:0.05rem;
            h3{
                width: 3.24rem;
                padding:0;
                height: 0.17rem;
                font-size: 0.13rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                float: left;
                margin-bottom: 0.1rem;
            }
            span{
                float: right;
            }
            .blue{
                color: #589daf!important;
                border: 1px solid #589daf!important;
            }
            .yellow{
                color: #f90!important;
                border: 1px solid #f90!important;
            }
            .type{
                float: left;
                padding: 0 3px;
                height: 15px;
                line-height: 15px;
                border-radius: 2px;
                font-size: 0.12rem;
                margin-right: 0.05rem;
            }
        }
    }
    
}
</style>

