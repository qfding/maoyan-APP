<template>
    <div class="cinemaInfo">
        <app-header :title="cinemaData.nm">
            <div slot='left' @click="backAction">&lt;</div> 
        </app-header>
        <div class="content">

            <div class="cinemaName">
                    <h2>{{cinemaData.nm}}</h2>
                    <p>{{cinemaData.addr}}</p>
                <div class="positionImg">
                    <img src="../../assets/position.png" alt="">
                </div>
            </div>
            <div class="swiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in showMovieList" :key="index"
                            :style="{backgroundImage:'url('+item.img.replace('/w.h','/148.208')+')'}"
                            ></div>
                    </div>
                    <!-- Add Pagination -->
                    <!-- <div class="swiper-pagination"></div> -->
                </div>
            </div>
            <div class="movieInfo">
                <div class="infoHead">
                    <h2>{{movieInfo.nm}}<span>{{movieInfo.sc}}分</span></h2>
                    <p>{{movieInfo.desc}}</p>
                </div>
                <ul class="dateLi">
                    <li v-for="(item,index) in dateList" :key="index" @click="selectDateLi(index)"
                    :class="{active: DateLi==index}"
                    >
                        {{item.dateShow}}
                    </li>
                </ul>
                <div class="vipBox">
                        <div class="left">
                            <span class="card">{{vipInfo.tag}}</span>
                            <span>{{vipInfo.title}}</span>
                        </div>
                        <div class="right">
                            {{vipInfo.process}}
                        </div>
                </div>
                <ul class="DateAll">
                    <li v-for="(item,index) in DateAll" :key="index" class="DateAllLi">
                        <div class="left">
                            <div class="inLeft">
                                <h2>{{item.tm}}</h2>
                                <span></span>
                            </div>
                            <div class="inRight">
                                <h3>{{item.lang}}{{item.tp}}</h3>
                                <span>{{item.th}}</span>
                            </div>
                        </div>
                        <div class="right">
                            <div class="inLeft">
                                <h4>￥{{item.vipPrice}}<span class="card">{{vipInfo.tag}}</span></h4>
                                <p>{{item.extraDesc}}</p>
                            </div>
                            <div class="buyBtn">
                                购票
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="blank" v-show="blankIsShow">
                   <div class="blank-content">
                       <img src="../../assets/showOver.png" alt="">
                       <p>今日场次已放映完</p>
                   </div>
                </div>
                <ul class="food" v-if="foodIsShow">
                    <li class="cover"></li>
                    <li class="head">影院超值套餐</li>
                   <!-- 双人餐 -->
                    <li v-for="(item,index) in foodList[1].dealList" :key="index" class="contentList">
                        <div class="left">
                            <img :src="item.imageUrl.replace('/w.h','/400.0')" alt="">
                        </div>
                        <div class="right">
                            <div class="title">
                                <p>
                                    <span>双人</span>{{item.title}}
                                </p>
                            </div>
                            <div class="middle">
                                <span>{{item.curNumberDesc}}</span>
                            </div>
                            <div class="buyBtn">
                                <div class="price">
                                    ￥{{item.price}}
                                </div>
                                <div class="btn">
                                    购买
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-for="(item,index) in foodList[0].dealList" :key="index" class="contentList">
                        <div class="left">
                            <img :src="item.imageUrl.replace('/w.h','/400.0')" alt="">
                        </div>
                        <div class="right">
                            <div class="title">
                                <p>
                                    <span>单人</span>{{item.title}}
                                </p>
                            </div>
                            <div class="middle">
                                <span>{{item.curNumberDesc}}</span>
                            </div>
                            <div class="buyBtn">
                                <div class="price">
                                    ￥{{item.price}}
                                </div>
                                <div class="btn">
                                    购买
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-for="(item,index) in foodList[2].dealList" :key="index" class="contentList">
                        <div class="left">
                            <img :src="item.imageUrl.replace('/w.h','/400.0')" alt="">
                        </div>
                        <div class="right">
                            <div class="title">
                                <p>
                                    <span>多人</span>{{item.title}}
                                </p>
                            </div>
                            <div class="middle">
                                <span>{{item.curNumberDesc}}</span>
                            </div>
                            <div class="buyBtn">
                                <div class="price">
                                    ￥{{item.price}}
                                </div>
                                <div class="btn">
                                    购买
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import { getCinemaInfo } from "../../services/cinemaService";
export default {
  data() {
    return {
      cinemaId: "",
      cinemaData: {},
      showMovieList: [],
      movieInfo:{},
      dateList:[],
      DateLi:0,
      DateAll:[],
      vipInfo:{},
      foodList:[{},{},{}],
      blankIsShow:false,
      foodIsShow:true,
      
    };
  },
  watch:{
      DateAll(){
          if(this.DateAll.length!=0){
                this.blankIsShow=false ;
                this.foodIsShow=true;
          }else{
              this.blankIsShow=true
                this.foodIsShow=false;
              
          }
      }
  },
  methods: {
    backAction() {
      this.$router.back();
    },
    createSwiper(){
        var _this=this;
         var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 0,
            grabCursor: true,
            effect: 'coverflow',      
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : false,
            },
            on: {
                slideChangeTransitionEnd: function(){
                // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                _this.movieInfo=_this.showMovieList[this.activeIndex];
                _this.dateList=_this.movieInfo.shows
                _this.DateAll=  _this.dateList[0].plist
                // console.log(_this.dateList)
                },
            },
            });

    },
    selectDateLi(index){
        this.DateLi=index
        this.DateAll=  this.dateList[this.DateLi].plist        
    }
  },
  created() {
    this.cinemaId = this.$route.params.cinemaId;

    getCinemaInfo(this.cinemaId).then(data => {
        this.cinemaData = data.cinemaData;
     console.log(data.cinemaData)
        this.vipInfo=data.showData.vipInfo[0]
        
      this.showMovieList = data.showData.movies;


      if(this.showMovieList[0]){
          this.movieInfo=this.showMovieList[0]
            this.dateList=this.movieInfo.shows    
    
            this.DateAll=  this.dateList[0].plist;
      }

            // console.log(data.dealList)
        // 食物列显示与否
        if(data.dealList.divideDealList.length>0){
            this.foodList=data.dealList.divideDealList;
            console.log(this.foodList)
            this.foodIsShow=true;             
        }else{
            this.foodIsShow=false; 
        }


        //判断是否放映完
        if(this.DateAll.length==0){
            this.blankIsShow=true
            this.foodIsShow=false;            
        }

    //   console.log(this.foodList);
    });
  },
  mounted(){
          this.createSwiper();
  }
};
</script>

<style lang="scss" scoped>
.cinemaInfo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 102;
  font-size: 0.14rem;
  color: #777;
  background-color: #fff;
  .content {
    position: absolute;
    top: 44px;
    width: 100%;
    bottom: 0px;
    overflow: auto;
    // padding: 0.15rem 1rem 0.15rem 0.15rem;
    .cinemaName{
        margin:0.15rem 1rem 0.15rem 0.15rem;
            width: 3rem;
            h2 {
                font-size: 0.17rem;
                line-height: 0.24rem;
                font-weight: 700;
                color: #333;
            }
            p {
                margin-top: 2px;
                font-size: 0.13rem;
                line-height: 0.19rem;
                color: #999;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        .positionImg {
        width: 0.7rem;
        height: 0.3rem;
        border-left: 1px solid #d8d8d8;
        position: absolute;
        top: 0.2rem;
        right: 0.15rem;
        text-align: center;
        padding-top: 0.05rem;
        img {
            display: inline-block;
            width: 0.19rem;
            height: 0.22rem;
        }
        }
    }
  }
  .swiper{
      width: 100%;
      height: 1.35rem;
      background-color: #40454d;
      padding-top:0.2rem;
    .swiper-container {
        width: 100%;
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 0.75rem!important;
            height: 0.95rem;
            margin-right: 0!important;
            margin-left:0.16rem;
        }
    }
  }
  .movieInfo{
     text-align: center;
     position: relative;
      h2{
        margin: 0.11rem 0.15rem;
          height: 0.24rem;
            line-height: 0.24rem;
            font-size: 0.17rem;
            color: #333;
            font-weight: 700;
            span{
                color: #ffb400;
                font-size: 0.16rem;
            }
      }
      p{
            margin-top: 2px;
            height: 0.19rem;
            line-height: 0.19rem;
            font-size: 0.13rem;
            color: #999;
      }
      .dateLi{
          overflow: hidden;
          li{
            float: left;
            margin-left: 0.15rem;
            display: inline-block;
            line-height: 0.45rem;
            height: 0.45rem;
            text-align: center;
            font-size: 0.14rem;
            color: #666;
            
          }
          .active{
                  color: #f03d37;
                position: relative;
                border-bottom: 1px solid #f03d37;
          }
      }
      .vipBox{
                background-color: #fff5ea;
                height: 0.42rem;
                line-height: 0.42rem;
                    padding: 0 0.15rem;
                .left{
                    float: left;
                        color: #fa9600;
                        font-size: 0.12rem;
                    .card{
                            background-color: #ff941a;
                            border-radius: 2px;
                            font-size: 0.1rem;
                            line-height: 0.15rem;
                            height: 0.15rem;
                            width: 0.34rem;
                            text-align: center;
                            color: #fff;
                            margin-top: 0.13rem;
                            margin-right: 0.1rem;
                    }
                }
                .right{
                    float: right;
                }
      }
      .DateAll{
          .DateAllLi{
            overflow: hidden;
            padding-top:0.17rem;
            p{
                font-size: 0.11rem;
                color: #999;
                white-space: normal;
            }
            .left{
                float: left;
                overflow: hidden;
                .inLeft{
                    float: left;
                    h2{
                        font-size: 0.20rem;
                        color: #333;
                        line-height: 1;
                        white-space: nowrap;
                        font-weight: normal;
                    }
                } 
                .inRight{
                    float: right;
                    text-align: center;
                    width: 1.36rem;
                    h3{
                        margin-top: 2px;
                        line-height: 0.18rem;
                        font-size: 0.13rem;
                        color: #333;
                        white-space: normal;
                        font-weight: normal;
                    }
                    span{
                        font-size: 0.11rem;
                        color: #999;
                        white-space: normal;
                    }
                }
            }
            .right{
                float: right;
                overflow: hidden;  
                margin-right: 0.13rem;
                .inLeft{
                    width: 1.3rem;
                    float: left;
                    h4{
                        line-height: 1;
                        color: #f03d37;
                        margin-top: 1px;
                        font-size: 0.19rem;
                        font-weight: normal;
                        span{
                            background-color: #ff941a;
                            border-radius: 2px;
                            font-size: 0.1rem;
                            line-height: 0.15rem;
                            height: 0.15rem;
                            width: 0.34rem;
                            text-align: center;
                            color: #fff;
                            margin-right: 0.1rem;
                        }
                    }
                    
                }              
                .buyBtn{
                    float: right;
                    width: 0.45rem;
                    height: 0.27rem;
                        line-height: 0.27rem;
                        font-size: 0.12rem;
                        background-color: #f03d37;
                        color: #fff;
                        border-radius: 4px;
                        text-align: center;
                }
            }
          }
      }
      .blank{
          position: relative;
          height:2.7rem;
          background-color: #f0f0f0;
          .blank-content{
              width: 50%;
              height: 50%;
              position: absolute;
              top:0;
              bottom: 0;
              left: 0;
              right: 0;
              margin:auto;
                img{
                    width: 0.78rem;
                    margin:0 auto;
                }
                p{
                    margin-top: 0.12rem;
                    line-height: 1;
                    font-size: 0.16rem;
                    color: #acacac;
                }
          }

      }
      .food{
          li{
              margin-left:0.15rem;
              text-align: left;
          }
        .cover{
            height: 0.2rem;
            background-color: #f0f0f0;
              margin-left:0rem; 
                       
        }
        .head{
             line-height: 0.45rem;
                height: 0.45rem;
                font-size: 0.15rem;
                color: #666; 
        }
        .contentList{
            overflow: hidden;
            cursor: pointer;
            position: relative;
            // width: 100%;
            padding: 13px 0;
            overflow: hidden;
            .left{
                float: left;
                img{
                    width: 0.92rem;
                }
            }
            .right{
                float: right;
                .title{

                    p{
                        width: 2.8rem; 
                        font-size: 14px;
                        line-height: 18px;
                        color: #333;
                        display: -webkit-box;
                        // overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical; 
                        span{
                            display: inline-block;
                            vertical-align: top;
                            margin-top: 1px;
                            margin-right: 7px;
                            padding: 0 4px;
                            font-size: 10px;
                            line-height: 15px;
                            height: 15px;
                            background: #f90;
                            border-radius: 2px;
                            color: #fff;
                        }

                    }
                }
                .middle{
                    span{
                        float: right;
                        position: absolute;
                        bottom: 34px;
                        right: 0;
                        line-height: 16px;
                        height: 16px;
                        font-size: 12px;
                        color: #999;
                        margin-right: 0.1rem;
                    }
                }
                .buyBtn{
                    position: absolute;
                    bottom: 0;
                    width: 2.8rem;
                    .price{
                        float: left;
                            color: #f03d37;
                                font-size: 0.17rem;
                    }
                    .btn{
                        float: right;
                        display: inline-block;
                        padding: 0 8px;
                        height: 27px;
                        line-height: 27px;
                        font-size: 12px;
                        border-radius: 3px;
                        color: #fff;
                        background-color: #f03d37;
                        margin-right: 0.1rem;
                        
                    }
                }
            }
        }
      }
  }
}
</style>
