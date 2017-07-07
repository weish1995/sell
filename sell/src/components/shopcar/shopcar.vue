<template>
  <div>
    <div class="shoppingcar">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{ payDesc }}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <transition v-for="(ball,index) in balls" :key="index" name="drop" @before-enter="beforeEnter"
                    @enter="enterMeth"
                    @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price * food.count }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mark" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBall: [],
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });

        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });

        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        }

        if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`;
        }

        return '去结算';
      },
      payClass() {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        }

        return 'not-enough';
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;

        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }

        return show;
      }
    },
    components: {
      'v-cartcontrol': cartcontrol
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBall.push(ball);
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
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enterMeth(el, done) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.transform = 'translate3d(0, 0, 0)';
        });
        done();
      },
      afterEnter(el) {
        setTimeout(() => {
          let ball = this.dropBall.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        }, 400);
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }

        window.alert(`您需要支付￥${this.totalPrice}元`);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/styles/mixin';

  .shoppingcar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 48px;

    .content {
      display: flex;
      position: relative;
      z-index: 201;
      color: rgba(255, 255, 255, .4);
      background-color: #141d27;

      .content-left {
        flex: 1;
        font-size: 0;

        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -8px;
          margin: 0 12px;
          border-radius: 50%;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: top;
          background-color: #141d27;

          @media only screen and (max-width: 320px) {
            margin-right: 0;
          }

          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: #2b343c;

            &.highlight {
              background-color: rgb(0, 160, 220);

              .icon-shopping_cart {
                color: #fff;
              }
            }

            .icon-shopping_cart {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
            }
          }

          .num {
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 16px;
            width: 24px;
            height: 16px;
            font-size: 9px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
            color: #fff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }

        .price {
          display: inline-block;
          margin-top: 12px;
          border-right: 1px solid rgba(255, 255, 255, .1);
          padding-right: 12px;
          font-size: 16px;
          font-weight: 700;
          vertical-align: top;
          line-height: 24px;
          box-sizing: border-box;

          @media only screen and (max-width: 320px) {
            overflow: hidden;
            padding-right: 4px;
            max-width: 48px;
          }

          &.highlight {
            color: #fff;
          }
        }

        .desc {
          display: inline-block;
          margin-top: 14px;
          margin-left: 12px;
          font-size: 10px;
          line-height: 20px;
          vertical-align: top;

          @media only screen and (max-width: 320px) {
            margin-left: 3px;
          }
        }
      }

      .content-right {
        width: 105px;
        flex: 0 0 105px;

        .pay {
          height: 48px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          line-height: 48px;

          &.not-enough {
            background-color: #2b333b;
          }

          &.enough {
            color: #fff;
            background-color: #00b43c;
          }
        }
      }
    }

    .ball-container {
      .ball {
        position: fixed;
        bottom: 32px;
        left: 32px;
        z-index: 200;
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all .4s linear;
        }
      }
    }

    .shopcart-list {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      transition: all .5s;
      transform: translate3d(0, -100%, 0);

      &.fold-enter,
      &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }

      .list-header {
        border-botttom: 1px solid rgba(7, 17, 27, .1);
        padding: 0 18px;
        height: 40px;
        line-height: 40px;
        background-color: #f3f5f7;

        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }

      .list-content {
        overflow: hidden;
        padding: 0 18px;
        max-height: 217px;
        background-color: #fff;

        .food {
          position: relative;
          .border-1px(rgba(7, 17, 27, .1));
          padding: 12px 0;
          box-sizing: border-box;

          .name {
            font-size: 14px;
            line-height: 24px;
            color: rgb(7, 17, 27);
          }

          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }

          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }

  .list-mark {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, .6);
    backdrop-filter: blur(10px);
    opacity: 1;
    transition: all .5s;

    &.fade-enter,
    &.fade-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
</style>
