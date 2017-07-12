<template>
  <div class="footer-wrapper">
    <footer class="shopcar">
      <div class="info" @click="toggleDetail" :class="{'active': totalCount!==0}">
      <span class="icon-wrapper">
        <span class="icon-bg">
          <i class="icon-shopping_cart"></i>
        </span>
        <i class="foods-count" v-show="totalCount>0">{{ totalCount }}</i>
      </span>
        <span class="total-money">￥{{ totalMoney }}</span>
        <span class="delivery">另需￥{{ seller.deliveryPrice }}元配送费</span>
      </div>
      <div class="settlement" :class="{'active':seller.minPrice-totalMoney<=0}">
        <span class="total">{{ totalInfo }}</span>
      </div>
      <div class="drop-balls">
        <transition name="animate" v-for="(ball, index) in balls" :key="index" @before-enter="beforeEnter" @enter="enter"
                    @after-enter="afterEnter">
          <div class="ball-wrapper" v-show="ball.show">
            <div class="ball"></div>
          </div>
        </transition>
      </div>
    </footer>
    <div class="detail-bg" v-show="isShow" @click="toggleDetail"></div>
    <transition name="slide">
      <div class="shop-detail" v-show="isShow">
        <h3 class="title-wrapper">
          <b class="title">购物车</b>
          <span class="clear" @click="clearFoods">清空</span>
        </h3>
        <div class="food-list-wrapper" ref="foodlist">
          <ul>
            <li class="food-list" v-for="item in selectFoods">
              <b class="name">{{ item.name }}</b>
              <div class="food-info">
            <span class="price">
              <span class="comp">￥</span>{{ item.price * item.count }}
            </span>
                <v-carcontrol class="control" :food="item"></v-carcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import carcontrol from 'components/carcontrol/carcontrol';

  export default{
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        isShow: false
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      seller: {
        type: Object
      }
    },
    components: {
      'v-carcontrol': carcontrol
    },
    computed: {
      totalMoney() {
        let totalMoney = 0;
        this.selectFoods.forEach((item) => {
          totalMoney += item.count * item.price;
        });

        return totalMoney;
      },
      totalCount() {
        let totalCount = 0;
        this.selectFoods.forEach((item) => {
          totalCount += item.count;
        });

        return totalCount;
      },
      totalInfo() {
        if (!this.selectFoods || this.selectFoods.length === 0) {
          return `￥${this.seller.minPrice}起送`;
        }

        let diff = this.seller.minPrice - this.totalMoney;

        if (diff > 0) {
          return `还差￥${diff}元起送`;
        }

        return '去结算';
      }
    },
    methods: {
      getElement(el) {
        for (let i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) {
            this.balls[i].show = true;
            this.balls[i].el = el;
            this.dropBalls.push(this.balls[i]);
            return;
          }
        }
      },
      beforeEnter(el) {
        let len = this.balls.length;
        while (len--) {
          let dBall = this.balls[len];
          if (dBall.show) {
            let rect = dBall.el.getBoundingClientRect();
            let x = rect.left - 28;
            let y = -(window.innerHeight - rect.top - 56);
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('ball')[0];
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el, done) {
        /* !important 触发浏览器重绘 */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0, 0, 0)';
          let ballInner = el.getElementsByClassName('ball')[0];
          ballInner.style.transform = 'translate3d(0, 0, 0)';
        });
        /* !important */
        done();
      },
      afterEnter(el) {
        setTimeout(() => {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        }, 400);
      },
      toggleDetail() {
        if (!this.selectFoods || this.selectFoods.length <= 0) {
          this.isShow = false;
          return;
        }

        this.isShow = !this.isShow;

        if (this.isShow) {
          this.$nextTick(() => {
            if (!this.foodList) {
              this.foodList = new BScroll(this.$refs.foodlist, {
                click: true
              });
            } else {
              this.foodList.refresh();
            }
          });
        }
      },
      clearFoods() {
        this.selectFoods.forEach((item) => {
          Vue.set(item, 'count', 0);
        });
      }
    },
    watch: {
      selectFoods() {
        if (!this.selectFoods || this.selectFoods.length <= 0) {
          this.isShow = false;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../commons/style/base';

  .footer-wrapper {
    .shopcar {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 48px;
      background-color: #141d27;

      .info {
        position: relative;
        z-index: 100;
        flex: 1;
        padding: 12px 12px 12px 74px;
        line-height: 24px;
        font-size: 0;
        color: #80858a;

        .icon-wrapper {
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: 18px;
          z-index: 101;
          border-radius: 50%;
          width: 58px;
          height: 58px;
          background-color: #141d27;

          .icon-bg {
            display: inline-flex;
            position: absolute;
            top: 7px;
            left: 7px;
            z-index: 102;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            justify-content: center;
            align-items: center;
            background-color: #2a333b;

            .icon-shopping_cart {
              font-size: 24px;
              line-height: 24px;
            }
          }

          .foods-count {
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 9px;
            padding: 4px 7px;
            font-size: 9px;
            font-style: normal;
            color: #fff;
            z-index: 203;
            background-color: #f01414;
          }
        }

        .total-money {
          border-right: 1px solid rgba(255, 255, 255, .1);
          padding: 0 12px 0 11px;
          font-size: 16px;
          font-weight: 700;
        }

        .delivery {
          padding-left: 12px;
          font-size: 10px;
          line-height: 24px;
        }

        &.active {
          .icon-wrapper {
            .icon-bg {
              background-color: #00a0dc;

              .icon-shopping_cart {
                color: #fff;
              }
            }
          }

          .total-money {
            color: #fff;
          }
        }
      }

      .settlement {
        flex: 0 0 105px;
        padding: 0 8px;
        width: 105px;
        text-align: center;
        line-height: 48px;
        background-color: #2b333b;
        box-sizing: border-box;

        &.active {
          background-color: #00b43c;

          .total {
            color: #fff;
          }
        }

        .total {
          font-size: 12px;
          font-weight: 700;
          line-height: 24px;
          color: rgba(255, 255, 255, .4);
        }
      }

      .drop-balls {
        .ball-wrapper {
          display: inline-block;
          position: fixed;
          bottom: 30px;
          left: 35px;
          z-index: 200;
          transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

          .ball {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgb(0, 160, 220);
            transition: all .4s linear;
          }
        }
      }
    }

    .detail-bg {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 48px;
      left: 0;
      z-index: 20;
      background-color: rgba(7, 17, 27, .6);
      backdrop-filter: blur(10px);
    }

    .shop-detail {
      overflow: hidden;
      position: fixed;
      bottom: 48px;
      left: 0;
      z-index: 99;
      width: 100%;
      max-height: 257px;
      background-color: #fff;
      transition: all .4s ease;

      &.slide-enter,
      &.slide-leave-to {
        transform: translate3d(0, 100%, 0);
      }

      .title-wrapper {
        overflow: hidden;
        .border-bottom-1px(rgba(7, 17, 27, .1));
        padding: 0 18px;
        height: 40px;
        line-height: 40px;
        background-color: #f3f5f7;

        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .clear {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }

      .food-list-wrapper {
        overflow: hidden;
        padding: 0 18px;
        max-height: 217px;

        .food-list {
          overflow: hidden;
          .border-bottom-1px(rgba(7, 17, 27, .1));
          padding: 12px 0;
          height: 48px;
          box-sizing: border-box;

          &:last-child:after {
            border-top: 0;
          }

          .name {
            float: left;
            font-size: 14px;
            line-height: 24px;
            color: rgb(7, 17, 27);
          }

          .food-info {
            display: inline-block;
            float: right;

            .price {
              padding: 0 12px 0 18px;
              font-size: 14px;
              font-weight: 700;
              line-height: 24px;
              vertical-align: top;
              color: rgb(240, 20, 20);

              .comp {
                font-size: 10px;
                vertical-align: top;
              }
            }

            .control {
              position: relative;
              top: -5px;
            }
          }
        }
      }
    }
  }
</style>
