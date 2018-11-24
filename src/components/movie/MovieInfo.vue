<template>
    <div class="movieDetail">
        <app-header :title="movieDetail.nm">
            <div slot='left' @click="backAction">&lt;</div> 
        </app-header>
        <div class="movieHeader" @click="toMovieDetail">
            <header class="movieBack"></header>
            <header class="movieBack2" :style="{'background':'url('+movieDetail.albumImg+') no-repeat'}"></header>
            <header class="movieIntroduce">
              <div class="movieImg">
                  <img :src="movieDetail.img" alt="">
              </div>
              <div class="movieZi">                                                                    
                  <h2>{{movieDetail.nm}}</h2>
                  <h3>{{movieDetail.enm}}</h3>
                  <h3><span>{{movieDetail.sc}}</span>({{movieDetail.snum}}人评)</h3>
                  <h3>{{movieDetail.cat}}</h3>
                  <h3>{{movieDetail.src}}/{{movieDetail.dur}}分钟</h3>
                  <h3>{{movieDetail.pubDesc}}</h3>
              </div>
              <div class="right-btn">
                  <img src="../../assets/rightBtn.png" alt="">
              </div>
          </header>
        </div>
        <div class="contentNav" ref='contentnav'>
            <h-scroll class="expected-list">
              <li  class="expected-item" v-for="(item,index) in dateList" :key="index"
              :class="{active: SelectExpectedIndex==index}" @click="changeSelectExpectedIndex(index)"
              > 
                  {{item.date}}
              </li>
            </h-scroll>
            <select-com :style="{top:'0.44rem',bottom: '0'}" @pushSelectIndex="setSelectIndex"/>          
        </div>
        <app-content :style="{top: '3.2rem', bottom: '0'}" :canLoadMore="canLoadMore">
            <ul class="cinemaShow">
                <li v-for='(item,index) in cinemaList' :key='index' class="cinemaInfo">
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
                    <div class="card">
                        <span class="cardImg"></span>
                        <span>开卡特惠，首单俩张立减六元</span>
                    </div>
                    <div class="open">
                        近期场次：{{item.showTimes}}
                    </div>
                </li>
            </ul>
        </app-content>
    </div>
</template>

<script>
import { getMovieDetail } from "../../services/movieService";
import { getMovieCinemaList } from "../../services/cinemaService";
import { mapGetters, mapState } from "vuex";
import Select from '../../components/select/Select'
export default {
  data() {
    return {
      movieId: 0,
      movieDetail: {},
      offset: 0,
      canLoadMore: true,
      cinemaList: [],
      openSelect:false,
      SelectIndex:3,
      dateList:[],
      SelectExpectedIndex:0
    };
  },
  components: {
        'select-com':Select
    },
  computed: {
    ...mapState(["cityID"]),
    ...mapGetters(["date"])
  },
  created() {
    this.movieId = this.$router.history.current.params.movieId;
    getMovieDetail(this.movieId).then(data => {
      this.movieDetail = data;
      console.log(data)
    });
    getMovieCinemaList(this.movieId, this.date, this.offset, this.cityID).then(
      data => {
        this.cinemaList = data.cinemas;
        this.dateList=data.showDays.dates;
        console.log(this.dateList);
      }
    );
  },
  methods: {
    backAction() {
      this.$router.back();
    },
    toMovieDetail(){
      this.$router.push({
                name:'MovieDetail',
                params:{
                    movieId:this.movieId
                }
            });
    },
    setSelectIndex(value){
      this.openSelect=value
      if(this.openSelect==3){
        this.$refs.contentnav.style.top='2.35rem'        
        this.openSelect=false
      }else{
        this.$refs.contentnav.style.top='44px'
        this.openSelect=true
      }
    },
    changeSelectExpectedIndex(index){
      this.SelectExpectedIndex=index;
    }
  }
};
</script>

<style lang="scss" scoped>
.movieDetail {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 10;
  font-size: 0.14rem;
  color: #777;
  background-color: aliceblue;
  .movieBack {
    width: 100%;
    height: 1.88rem;
    position: absolute;
    top: 44px;
    background-color: #333;
    z-index: -2;
  }
  .movieBack2 {
    width: 100%;
    height: 1.88rem;
    position: absolute;
    top: 44px;
    background-size: cover !important;
    z-index: -1;
    opacity: 0.55;
    filter: blur(0.1rem);
  }
  .movieIntroduce {
    width: 100%;
    height: 1.88rem;
    position: absolute;
    top: 44px;
    overflow: hidden;
    padding: 0.19rem 0.3rem 0.19rem 0.15rem;
    .movieImg {
      float: left;
      img {
        width: 1.1rem;
        height: 1.5rem;
      }
    }
    .movieZi {
      width: 2.35rem;
      float: left;
      color: #fff;
      margin-left: 0.13rem;
      h2 {
        width: 100%;
        font-size: 0.2rem;
        margin-top: 2px;
        font-weight: 700;
      }
      h3 {
        width: 100%;
        margin-top: 0.11rem;
        font-size: 0.12rem;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          font-size: 18px;
          font-weight: 700;
          color: #fc0;
        }
      }
    }
    .right-btn {
      float: right;
      margin-top: 0.7rem;
      img {
        width: 0.1rem;
        height: 0.15rem;
      }
    }
  }
  .contentNav{
      width: 100%;
      height: 0.85rem;
      background-color: #fff;
      position: absolute;
      top:2.35rem;
      .expected-item{
          position: relative;
          display: inline-block;
          width: 115px;
          line-height: 43px;
          margin-left: 4.5px;
          font-size: 14px;
          text-align: center;
          list-style: none;
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
    .active{
          border-bottom: 2px solid #f03d37;
          color: #f03d37;
    }
  }
  .cinemaShow {
    padding-left: 0.15rem;
    border-top: 1px solid #e6e6e6;
    background-color: #fff;
    font-size: 0.14rem;
    color: #777;
    .cinemaInfo {
      height: 1.42rem;
      padding: 0.15rem 0.15rem 0.15rem 0;
      border-bottom: 1px solid #e5e5e5;
      p {
        font-size: 0.16rem;
        color: #000;
        margin-bottom: 0.1rem;
        display: -webkit-box;
        display: flex;
        span {
          margin-left: 0.1rem;
          font-size: 0.17rem;
          color: #ef4238;
          span {
            font-size: 0.11rem;
            margin-left: 0rem;
            color: #ef4238;
          }
        }
      }
      .leftLittle {
        overflow: hidden;
        margin-left: 0.05rem;
        margin-bottom: 0.06rem;
        h3 {
          width: 3.24rem;
          padding: 0;
          height: 0.17rem;
          font-size: 0.13rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          float: left;
          margin-bottom: 0.06rem;
        }
        span {
          float: right;
        }
        .blue {
          color: #589daf !important;
          border: 1px solid #589daf !important;
        }
        .yellow {
          color: #f90 !important;
          border: 1px solid #f90 !important;
        }
        .type {
          float: left;
          padding: 0 3px;
          height: 15px;
          line-height: 15px;
          border-radius: 2px;
          font-size: 0.12rem;
          margin-right: 0.05rem;
        }
      }
      .card{
          width: 100%;
          height: 0.15rem;
           margin-top:0.05rem;
           margin-left:0.05rem;           
          .cardImg{
            width: 0.15rem;
            height: 0.15rem;
            display: block;
            margin-right:0.05rem;
            float: left;
            background: url(../../assets/card.png) no-repeat;
            background-size: cover;
          }
      }
      .open{
        margin-top:0.05rem;
      }
    }
  }
}
</style>
