<template>
    <div class="seach">
        <app-header title="猫眼电影">
            <div slot='left' @click="backAction">&lt;</div>            
        </app-header>
        <section class="seach-section">
            <div class="seach-header">
                <div class="seach-input">
                    <img src="../../assets/sou.png" alt="">
                    <input type="text" placeholder="搜电影、搜影院" ref='words' @input="inputChange" autocomplete="on">
                    <img src="../../assets/cha.png" alt="" ref="del" class="delImg" @click="clearInput">
                </div>
                <div class="cancel" @click="backAction">取消</div>
            </div>

            <div class="blank" v-show='blankShow'>
                <h3>热门搜索</h3>
            </div>
            <div class="movieShow" v-if='moviesShow && moviesShow2'>
                <h3>电影/电视剧/综艺</h3>
                <ul>
                    <li v-for='(item,index) in searchMovieList' :key='index' class="movieInfo">
                        <div>
                            <img :src="'/128.180'+item.img.split('/w.h')[1]" alt="">
                        </div>
                        <div class="search-introduce">
                            <h2>
                                {{item.nm}}
                                <p v-if='item.version=="v3d imax"'><img src="../../assets/3Dimax.png" alt=""></p>
                                <p v-if='item.version=="v3d"'><img src="../../assets/3D.png" alt=""></p>
                                <p v-if='item.version=="v2d imax"'><img src="../../assets/2Dimax.png" alt=""></p>                                
                            </h2>
                            <h4>{{item.enm}}</h4>
                            <h4>{{item.cat}}</h4>
                            <h4>{{item.rt}}</h4>
                        </div>
                        <div class="score" v-if='item.sc !== 0'>
                            <h3>{{item.sc}}分</h3>
                        </div>
                        <div class="score" v-if='item.sc == 0'>
                            <h3>{{item.wish}}人想看</h3>
                            <div class="btn">想看</div>
                        </div>
                    </li>
                    <li class="totalMovie">
                        查看全部{{totalMovies}}部影视剧
                    </li>
                </ul>
            </div>
            <div class="cinemaShow"  v-if='cinemasShow'>
                <h3>影院</h3>
                <ul>
                    <li v-for='(item,index) in searchCinemaList' :key='index' class="cinemaInfo">
                        <p>
                        {{item.nm}}
                        <span>{{item.sellPrice}}<span>元起</span></span>
                        </p>
                        <div class="leftLittle">
                            <h3>{{item.addr}}</h3><span>{{item.distance}}</span>
                        </div>
                        <div class="leftLittle">
                            <div class="type blue" v-show="item.allowRefund==1">退</div>
                            <div class="type blue" v-show="item.endorse==1">改签</div>
                            <div class="type yellow" v-show="item.snack==1">小吃</div>
                            <div class="type yellow" v-show="item.vipTag">折扣卡</div>
                            <div class="type blue" v-show='item.hallType'>CGS中国巨幕厅</div>
                            <div class="type blue" v-show='item.hallType'>杜比全展厅</div>
                        </div>
                    </li>
                    <li class="totalCinema">
                        查看全部{{totalCinemas}}家电影院
                    </li>
                </ul>
            </div>
        </section>

    </div>
</template>

<script>
import { getSearchList } from "../../services/movieService";
import {mapState} from 'vuex'

export default {
  props: {
    type: Array
  },
  data() {
    return {
      searchMovieList: [],
      totalMovies: 0,
      totalCinemas: 0,
      searchCinemaList: [],
      blankShow: true,
      moviesShow: false,
      cinemasShow: false,
      moviesShow2: true
    };
  },
  computed: {
        ...mapState(['cityID'])
    },
  mounted() {
    // console.log(this.type)
    if (this.type[1] == "movie") {
      this.moviesShow2 = true;
    } else {
      this.moviesShow2 = false;
      this.$refs.words.placeholder='搜影院'
    }
  },
  
  methods: {
    inputChange() {
      if (this.$refs.words.value !== "") {
        this.blankShow = false;
        this.$refs.del.style.display = "block";
        getSearchList(this.$refs.words.value,this.cityID).then(result => {
          if (result.movies) {
            (this.moviesShow = true),
              (this.searchMovieList = result.movies.list.splice(0, 3));
            this.totalMovies = result.movies.total;
          } else {
            (this.moviesShow = false), (this.searchMovieList = []);
            this.totalMovies = 0;
          }
          if (result.cinemas) {
            (this.cinemasShow = true),
              (this.searchCinemaList = result.cinemas.list.splice(0, 3));
            this.totalCinemas = result.cinemas.total;
          } else {
            (this.cinemasShow = false), (this.searchCinemaList = []);
            this.totalCinemas = 0;
          }
        });
      } else {
        this.blankShow = true;
        (this.cinemasShow = false),
          (this.moviesShow = false),
          (this.$refs.del.style.display = "none");
      }
    },
    clearInput() {
      this.$refs.words.value = "";
    },
    backAction() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.seach {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 10;
  font-size: 0.14rem;
  color: #777;
  overflow: auto;
  .seach-section {
    width: 100%;
    height: 100%;
    padding-top: 0.44rem;
    background-color: #f5f5f5;
    .seach-header {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      padding: 0.08rem 0 0.08rem 0.1rem;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e5e5e5;
      z-index: 1;
      .seach-input {
        padding: 0 10px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        background-color: #fff;
        -webkit-box-flex: 1;
        flex-grow: 1;
        display: flex;

        img {
          width: 0.15rem;
          height: 0.15rem;
          margin-top: 0.06rem;
        }
        input {
          -webkit-box-flex: 1;
          flex: 1;
          border: none;
          font-size: 0.13rem;
          color: #333;
          line-height: 0.2rem;
          padding: 0.04rem 0;
          width: calc(100% - 40px);
          margin-left: 0.06rem;
          margin-right: 0.06rem;
          &:focus {
            outline: none;
          }
        }
        .delImg {
          display: none;
        }
      }
      .cancel {
        height: 0.3rem;
        line-height: 0.3rem;
        padding: 0 0.1rem;
        font-size: 0.16rem;
        color: #f03d37;
      }
    }
    .blank {
      padding: 0 0 0.08rem 0.15rem;
      background-color: #fff;
      height: 0.61rem;
      h3 {
        border-top: 1px solid #e5e5e5;
        padding-top: 0.17rem;
        font-size: 0.15rem;
        color: #666;
      }
    }
    .movieShow {
      width: 100%;
      height: 4.14rem;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      margin-bottom: 0.1rem;
      h3 {
        font-size: 15px;
        color: #999;
        padding: 9px 15px;
      }
      ul {
        padding-left: 15px;
        border-top: 1px solid #e6e6e6;
        .movieInfo {
          width: 100%;
          height: 1.15rem;
          padding: 12px 0;
          border-bottom: 1px solid #e6e6e6;
          div {
            float: left;
            img {
              width: 0.64rem;
            }
          }
          .search-introduce {
            width: 2rem;
            height: 0.88rem;
            margin-left: 0.1rem;
            h2 {
              font-size: 0.17rem;
              color: #333;
              font-weight: 700;
              padding-right: 0.05rem;
              flex-shrink: 1;
              margin-bottom: 0.07rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              p {
                margin-left: 0.05rem;
                display: inline-block;
                img {
                  height: 0.14rem;
                }
              }
            }
            h4 {
              font-size: 0.13rem;
              color: #666;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 0.06rem;
            }
          }
          .score {
            float: right;
            h3 {
              color: #fa0;
              font-size: 0.16rem;
              flex-shrink: 0;
              padding-left: 0.05rem;
            }
            .btn {
              width: 0.48rem;
              height: 0.27rem;
              line-height: 0.27rem;
              text-align: center;
              background-color: #fa0;
              color: #fff;
              border-radius: 5px;
              margin-left: 0.2rem;
              margin-top: 0.1rem;
            }
          }
        }
        .totalMovie {
          width: 100%;
          height: 0.44rem;
          text-align: center;
          line-height: 0.44rem;
          color: #ef4238;
        }
      }
    }
    .cinemaShow {
      width: 100%;
      height: 3.92rem;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      h3 {
        font-size: 0.15rem;
        color: #999;
        padding: 0.09rem 0.15rem;
      }
      ul {
        padding-left: 0.15rem;
        border-top: 1px solid #e6e6e6;
        .cinemaInfo {
          height: 1.03rem;
          padding: 0.15rem 0.15rem 0.15rem 0;
          border-bottom: 1px solid #e5e5e5;

          p {
            font-size: 0.16rem;
            color: #000;
            margin-bottom: 0.06rem;
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
            h3 {
              width: 3.24rem;
              padding: 0;
              height: 0.17rem;
              font-size: 0.13rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              float: left;
              margin-bottom: 0.1rem;
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
        }
        .totalCinema {
          width: 100%;
          height: 0.44rem;
          text-align: center;
          line-height: 0.44rem;
          color: #ef4238;
        }
      }
    }
  }
}
</style>
