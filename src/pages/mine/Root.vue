<template>
<div class="page" id="mine">
    <app-header title="我的"></app-header>
    <header class="content">
        <div class="photo">
            <img src="../../assets/touxiang.jpg" alt="">
        </div>
        <div class="action">
            <h2>我的订单</h2>
            <div class="btnAction">
                <div class="movieBtn">
                    <img src="../../assets/dianying.png" alt="">
                    <span>电影</span>
                </div>
                <div class="shopBtn">
                    <img src="../../assets/shop.png" alt="">
                    <span>商城</span>
                </div>
            </div>
        </div>
        <div class="list">
            <h4>在线观影</h4>
            <h4>优惠券</h4>
            <h4>折扣卡</h4>            
        </div>
    </header>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#mine{
    font-size: 0.16rem;
    background-color: #f3f3f3;
    .content{
        position: absolute;
        top:44px;
        width: 100%;
        .photo{
            position: relative;
            width: 100%;
            height: 1.5rem;
            background-color: #e54847;
            text-align: center;
            img{
                position: absolute;                
                display: inline-block;
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 0.6rem;
                border: 3px solid #fff;
                top:50%;
                transform: translateY(-50%) translateX(-50%);               
            }
        }
        .action{
            background-color: #fff;
            margin-top:0.1rem;
            overflow: hidden;
            padding-bottom: 0.3rem;
            h2{
                width: 0.8rem;
                margin:0.13rem auto;
                font-size: 0.15rem;
                line-height: 0.21rem;
                height: 0.21rem;
                color: #333;
                background-color: #fff;
            }
            .btnAction{
                width: 50%;
                margin: 0 auto;
                overflow: hidden;
                margin-top:0.2rem;
                .movieBtn{
                    float: left;
                    img{
                        width: 0.42rem;
                        margin-bottom: 0.1rem;
                    }
                    span{
                        margin-left:0.05rem;
                    }
                }
                .shopBtn{
                    float: right;
                    img{
                        width: 0.42rem;
                        margin-bottom: 0.1rem;
                    }
                    span{
                        margin-left:0.05rem;
                    }
                }
            }
        }
        .list{
            color: #333;
            background-color: #fff;
            h4{
                height: 0.44rem;
                line-height: 0.44rem;
                font-size: 0.16rem;
                font-weight: 400;
                margin-left:0.1rem;
                margin-top:0.1rem;
                border-bottom: 1px solid #f3f3f3;
            }
        }
    }

}
</style>
