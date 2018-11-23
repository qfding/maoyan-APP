<template>
    <div id="MovieDetail">
        <app-header :title="movieDetail.nm">
            <div slot='left' @click="backAction">&lt;</div> 
        </app-header>
        <div class="movieHeader">
            <header class="movieBack"></header>
            <header class="movieBack2" :style="{'background':'url('+movieDetail.albumImg+') no-repeat'}"></header>
            <header class="movieIntroduce">
                <div class="movieImg">
                    <img :src="movieDetail.img" alt="">
                    <span class="iconfont icon-bofang"></span>
                </div>
                <div class="movieZi">                                                                    
                    <h2>{{movieDetail.nm}}</h2>
                    <h3>{{movieDetail.enm}}</h3>
                    <h3><span>{{movieDetail.sc}}</span>({{movieDetail.snum}}人评)</h3>
                    <h3>{{movieDetail.cat}}</h3>
                    <h3>{{movieDetail.src}}/{{movieDetail.dur}}分钟</h3>
                    <h3>{{movieDetail.pubDesc}}</h3>
                </div>
            </header>
        </div>
        <div class="main">
            <div class="back" @click="backAction">
                特惠购票
            </div>
            <div class="dra" ref="box">
                <p>
                    {{movieDetail.dra}}
                </p>
                <div class="cover" @click="slider" ref="btn">
                    <span class="iconfont" :class='{"icon-up1":up,"icon-up":down}'></span>
                </div>
            </div>
            <div class="metaStore">
                <h2>媒体库</h2>
                <h-scroll class="expected-list">
                    <li class="expected-item widthImg">
                        <img :src="movieDetail.videoImg" alt="">   
                    <span class="iconfont icon-bofang"></span>                                             
                    </li>
                    <li  class="expected-item" v-for="(item,index) in movieDetail.photos" :key="index"> 
                        <img :src="'/128.180'+item.split('/w.h')[1]" alt="">
                    </li>
                </h-scroll>
                <div class="showNum">
                    <div class="videoNum">
                        <span class="left">视频</span>
                        <div class="right">
                            <span>{{movieDetail.vnum}}</span>
                            <span class="iconfont icon-iconfontyoujiantou"></span>
                        </div>
                    </div>
                    <div class="photoNum">
                        <span class="left">剧照</span>
                        <div class="right">
                            <span>{{movieDetail.pn}}</span>
                            <span class="iconfont icon-iconfontyoujiantou"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  getMovieDetail,
  getMoreMovieDetail
} from "../../services/movieService";

export default {
  data() {
    return {
      movieDetail: {},
      up: true,
      down: false,
      flag: true
    };
  },
  computed: {},
  methods: {
    backAction() {
      this.$router.back();
    },
    slider() {
      if (this.flag) {
        this.flag = false;
        this.$refs.btn.style.bottom = 0;
        this.up = false;
        this.down = true;
        this.$refs.box.style.height = "1.4rem";
      } else {
        this.flag = true;
        this.$refs.btn.style.bottom = "0rem";
        this.up = true;
        this.down = false;
        this.$refs.box.style.height = "1rem";
      }
    }
  },
  created() {
    this.movieId = this.$router.history.current.params.movieId;
    getMoreMovieDetail(this.movieId).then(data => {
      this.movieDetail = data;
      console.log(this.movieDetail);
    });
  }
};
</script>

<style lang="scss" scoped>
#MovieDetail {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 20;
  background-color: #f4f4f4;
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
      position: relative;
      float: left;
      img {
        width: 1.1rem;
        height: 1.5rem;
      }
      span {
        position: absolute;
        right: 0.1rem;
        bottom: 0.1rem;
        width: 0.26rem;
        height: 0.26rem;
        font-size: 0.26rem;
        color: #ccc;
      }
    }
    .movieZi {
      width: 2.4rem;
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
  .main {
    position: absolute;
    top: 2.4rem;
    width: 100%;
    // height: 100%;
    .back {
      width: 3.83rem;
      height: 0.37rem;
      background-color: #e54847;
      text-align: center;
      border-radius: 4px;
      line-height: 0.37rem;
      cursor: pointer;
      font-size: 16px;
      color: #fff;

      margin-left: 0.15rem;
    }
    .dra {
      position: relative;
      height: 1.4rem;
      margin-bottom: 0.15rem;
      background-color: #fff;
      p {
        width: 3.83rem;
        height: 1rem;
        color: #555;
        font-size: 0.16rem;
        margin: auto;
        margin-top: 0.1rem;
        line-height: 0.2rem;
      }
      .cover {
        width: 100%;
        height: 0.4rem;
        background-color: #fff;
        position: absolute;
        bottom: 0.4rem;
        z-index: 30;
        span {
          display: block;
          width: 0.2rem;
          margin: auto;
          font-size: 0.2rem;
        }
      }
    }
    .metaStore {
      padding: 0.15rem 0.1rem;
      background-color: #fff;
      h2 {
        margin: 0;
        color: #666;
        font-size: 0.16rem;
        font-weight: 700;
        margin-bottom: 0.1rem;
      }
      .expected-item {
        display: inline-block;
        width: 0.85rem;
        height: 0.73rem;
        overflow: hidden;
        margin-right: 0.1rem;
        position: relative;
        img {
          width: 0.93rem;
          height: 0.73rem;
        }
      }
      .widthImg{
              width: 1.29rem!important;      
              position: relative;    
          img{
              width: 1.29rem!important;
          }
          span{
               position: absolute;
                right: 0.1rem;
                bottom: 0rem;
                width: 0.26rem;
                height: 0.26rem;
                font-size: 0.26rem;
                color: #ccc;
          }
      }
      .showNum{
          margin-top:0.1rem;
            color: #666;
            font-weight: lighter;
            font-size: 0.14rem;
          .videoNum{
              float: left;
              width: 1.28rem;
              .left{
                  float: left;
              }
              .right{
                  float: right;
              }
          }
          .photoNum{
              float: left;   
              width: 2.45rem;    
              .left{
                  float: left;
              }
              .right{
                  float: right;
              }       
          }
      }
    }
  }
}
</style>
