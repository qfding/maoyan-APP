<template>
    <div class="cinemaInfo">
        <app-header :title="cinemaData.nm">
            <div slot='left' @click="backAction">&lt;</div> 
        </app-header>
        <div class="content">

            <div class="cinemaName">
                <div class="nameZi">
                    <h2>{{cinemaData.nm}}</h2>
                    <p>{{cinemaData.addr}}</p>
                </div>
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
                <h2>{{movieInfo.nm}}<span>{{movieInfo.sc}}分</span></h2>
                <p>{{movieInfo.desc}}</p>
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
      movieInfo:{}
    };
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
                    _this.movieInfo=_this.showMovieList[this.activeIndex]
                    console.log(_this.movieInfo)
                    },
                },
            });

    }
  },
  created() {
    this.cinemaId = this.$route.params.cinemaId;

    getCinemaInfo(this.cinemaId).then(data => {
      this.cinemaData = data.cinemaData;
      this.showMovieList = data.showData.movies;
      this.movieInfo=this.showMovieList[0]
    //   console.log(this.showMovieList);
    });
  },
  beforeUpdate(){
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
    // padding: 0.15rem 1rem 0.15rem 0.15rem;
    .cinemaName{
        margin:0.15rem 1rem 0.15rem 0.15rem;
        .nameZi {
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
      height: 0.67rem;
        padding: 11px 15px;
     text-align: center;

      h2{
          height: 24px;
            line-height: 24px;
            font-size: 17px;
            color: #333;
            font-weight: 700;
            span{
                color: #ffb400;
                font-size: 16px;
            }
      }
      p{
            margin-top: 2px;
            height: 18.5px;
            line-height: 18.5px;
            font-size: 13px;
            color: #999;
      }
  }
}
</style>
