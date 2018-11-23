<template>
<div id="Select">
    <div class="select">
        <div class="allCity" @click="select1" :class="{active: selectIndex==0}">
            <span>全程</span>
        </div>
        <div class="brand" @click="select2" :class="{active: selectIndex==1}">
            <span>品牌</span>            
        </div>
        <div class="features" @click="select3" :class="{active: selectIndex==2}">
            <span>特色</span>          
        </div>
    </div>

    <div class="selection">
        <div class="selection1" v-show='selectIndex==0'>
            <nav class="nav">
                <li v-for="(navItem, index) in navList" :key="index"
                    :class="{active: navIndex==index}" @click="navAction(index)">
                {{navItem}}
                </li>
            </nav>
            <div class="smallContent">
                <div class="shops" v-if="navIndex==0">
                    <ul class="left">
                        <li v-for="(item,index) in shopsList" :key=index ref='nameList' @click="selectStree(index)"
                        :class="{active: selectLi==index}"
                        >
                                {{item.name}}({{item.count}})
                        </li>
                    </ul>
                    <ul class="right">
                        <li v-for="(item,index) in selectStreeList" :key=index  @click="selectSureStree(index)"
                        :class="{active: selectSureLi==index}"
                        >
                               <div class="left-small">
                                   {{item.name}}
                               </div>
                               <div class="right-small">
                                   {{item.count}}
                               </div> 
                        </li>
                    </ul>
                </div>
                <div class="subs" v-if="navIndex==1">
                    <ul class="left">
                        <li v-for="(item,index) in subwayList" :key=index ref='nameList' @click="selectSub(index)"
                        :class="{active: subLi==index}"
                        >
                                {{item.name}}({{item.count}})
                        </li>
                    </ul>
                    <ul class="right">
                        <li v-for="(item,index) in selectSubList" :key=index  @click="selectSureSub(index)"
                        :class="{active: selectSureSubs==index}"
                        >
                               <div class="left-small">
                                   {{item.name}}
                               </div>
                               <div class="right-small">
                                   {{item.count}}
                               </div> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="selection2" v-show='selectIndex==1'>
            <ul class="right">
                <li v-for="(item,index) in brandList" :key=index  @click="selectSureSub(index)"
                :class="{active: selectSureSubs==index}"
                >
                        <div class="left-small">
                            {{item.name}}
                        </div>
                        <div class="right-small">
                            {{item.count}}
                        </div> 
                </li>
            </ul>
        </div>
        <div class="selection3" v-show='selectIndex==2'>
            <h2>特色功能</h2>
            <div class="btnAll">
                <div :class="{confirm:serviceIndex==index}" v-for="(item,index) in serviceList" :key=index>{{item.name}}</div>
            </div>
            <h2>特色厅</h2>
            <div class="btnAll">
                <div class="confirm">全部</div>
            </div>
            <div class="twoBtn">
                <div class="reset">
                    重置
                </div>
                <div class="sure">
                    确定
                </div>
            </div>
        </div>
    </div>

    <div class="blacker" ref='black'>

</div>
</div>


</template>

<script>
import {getSelectList} from '../../services/cinemaService'
import {mapState,mapGetters} from 'vuex'
export default {
    data(){
        return {
            selectIndex:3,
            navList: ['商区', '地铁站'],
            navIndex: 0,
            shopsList:{},
            selectLi:0,
            subLi:0,
            selectSureLi:0,
            subwayList:{},
            selectStreeList:[],
            selectSubList:[],
            selectSureSubs:0,
            brandList:[],
            serviceList:[],
            serviceIndex:0
        }
    },
    computed: {
        ...mapState(['cityID']),
        ...mapGetters(['date'])
    },
    watch:{
        selectIndex(newvalue,oldvalue){
            this.$emit('pushSelectIndex',newvalue)
        }
    },
    methods:{
        navAction(index){
            this.navIndex = index;
        },
        select1(){
            if(this.selectIndex==0){
                this.selectIndex=3
                this.$refs.black.style.display='none'
            }else{
                this.selectIndex=0
                this.$refs.black.style.display='block'
            }
            
        },
        select2(){
            if(this.selectIndex==1){
                this.selectIndex=3
                this.$refs.black.style.display='none'              
                
            }else{
                this.selectIndex=1
                this.$refs.black.style.display='block'               
            }
        },
        select3(){
            if(this.selectIndex==2){
                this.selectIndex=3
                this.$refs.black.style.display='none'                
            }else{
                this.selectIndex=2
                this.$refs.black.style.display='block'                
            }
        },
        selectStree(index){
            // this.$refs.nameList[index].style.background='red'
            this.selectLi=index;
            this.selectStreeList=this.shopsList[index].subItems;
            this.selectSureLi=0
            // console.log(this.selectStreeList);
        },
        selectSub(index){
            this.subLi=index;
            this.selectSubList=this.subwayList[index].subItems; 
            this.selectSureSubs=0           
        },
        selectSureStree(index){
            this.selectSureLi=index;            
        },
        selectSureSub(index){
            this.selectSureSubs=index;                        
        }
    },
    created(){
        getSelectList(this.cityID).then((data)=>{
            // console.log(data);
            this.shopsList=data.district.subItems;
            this.subwayList=data.subway.subItems;
            this.brandList=data.brand.subItems;

            this.serviceList=data.service.subItems;
            // console.log(this.serviceList)
        })
    }
}
</script>

<style lang="scss" scoped>
#Select{
    // z-index: 100;
    position: absolute;
    width: 100%;
    //  background: rgba(0,0,0,.3);
    .select{
        position: relative;
        z-index: 100;
        font-size: 0.13rem;
        display: flex;
        background-color: #fff;
        width: 100%;
        text-align: center;
        line-height: 0.4rem;
        .allCity{
            height: 0.4rem;
            flex: 1;
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
        .brand{
            height: 0.4rem;        
            flex: 1; 
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
        .features{
            height: 0.4rem;        
            flex: 1;
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
        .active{
            color: #f03d37;
            &::after{
                border-top: 6px solid #f03d37;                
            }
        }
    }
    .selection{
        position: relative;
        z-index: 100;
        background-color: #fff;
        .selection1{
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
            .smallContent{
                // background-color: #fff;
                overflow: hidden;
                .shops{
                    font-size: 0.14rem;
                    text-align: center;
                    overflow: hidden;
                    .left{
                        float: left;
                        li{
                            width: 1.22rem;
                            height: 0.44rem;
                            line-height: 0.44rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .active{
                            background-color: #f5f5f5!important;
                        }
                    }
                    .right{
                        width: 2.59rem;
                        height:4.4rem;
                        float: left;
                        background-color: #f5f5f5!important;
                        overflow: auto;
                        li{
                            width: 100%;
                            height: 0.44rem;
                            line-height: 0.44rem;
                            padding:0 0.1rem;
                            text-align: left;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            .left-small{
                                float: left;
                            }
                            .right-small{
                                float: right;
                            }
                        }
                        .active{
                            color: #f03d37;
                        }
                    }
                }
                .subs{
                    font-size: 0.14rem;
                    text-align: center;
                    overflow: hidden;
                    .left{
                        float: left;
                        li{
                            width: 1.22rem;
                            height: 0.44rem;
                            line-height: 0.44rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .active{
                            background-color: #f5f5f5!important;
                        }
                    }
                    .right{
                        width: 2.59rem;
                        height:4.4rem;
                        float: left;
                        background-color: #f5f5f5!important;
                        overflow: auto;
                        li{
                            width: 100%;
                            height: 0.44rem;
                            line-height: 0.44rem;
                            padding:0 0.1rem;
                            text-align: left;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            .left-small{
                                float: left;
                            }
                            .right-small{
                                float: right;
                            }
                        }
                        .active{
                            color: #f03d37;
                        }
                    }
                }
            }
        }
        .selection2{
            .right{
                width: 100%;
                height:3.5rem;
                float: left;
                background-color: #fff!important;
                overflow: auto;
                li{
                    width: 100%;
                    height: 0.44rem;
                    line-height: 0.44rem;
                    padding:0 0.2rem;
                    text-align: left;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .left-small{
                        float: left;
                    }
                    .right-small{
                        float: right;
                    }
                }
                .active{
                    color: #f03d37;
                }
            }
        }
        .selection3{
                padding-top: 0.11rem;
            h2{
                margin-left: 0.12rem;
                font-size: 0.15rem;
            }
            .btnAll{
                margin:0.1rem 0;
                overflow: hidden;
                div{
                    width: 0.78rem;
                    height: 0.38rem;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    text-align: center;
                    line-height: 0.38rem;
                    float: left;
                    margin-right:0.2rem;
                }
                .confirm{
                    color: #f03d37;
                    border:1px solid #f03d37;
                    background-color: #fcf0f0;
                    
                }
            }
            .twoBtn{
                overflow: hidden;
                div{
                    width: 0.87rem;
                    height: 0.36rem;
                }
                .reset{
                    float: left;
                    height: 34px;
                    width: 21.3%;
                    margin: 13px 11px;
                    border: 1px solid #e5e5e5;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                }
                .sure{
                    float: right;
                    height: 34px;
                    width: 21.3%;
                    margin: 13px 11px;
                    border: 1px solid #e5e5e5;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background-color: #f03d37;
                    color: #fff;
                    
                    
                }
            }
        }
        
    }
    .blacker{
        position: absolute;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
        z-index: 99;
        display: none;
    }
}
</style>
