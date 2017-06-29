<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="scroll">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}</span>
            <span class="rating">好评率{{ food.rating }}%</span>
            <v-price :food="food"></v-price>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol @cart="cartAdd" :food="food"></v-cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
        </div>
      </div>
      <v-split v-if="food.info"></v-split>
      <div class="info" v-if="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{ food.info }}</p>
      </div>
      <div>
        <br>1
        <br>1
        <br>1
        <br>1
        <br>1
        <br>1
        <br>1
        <br>1
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import price from 'components/price/price';
  import split from 'components/split/split';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    components: {
      'v-price': price,
      'v-cartcontrol': cartcontrol,
      'v-split': split
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.scroll, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }

        Vue.set(this.food, 'count', 1);
        this.$emit('cart', event.target);
      },
      cartAdd(event) {
        this.$emit('cart', event);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .food {
    position: fixed;
    top: 0;
    bottom: 48px;
    left: 0;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    transition: all .2s linear;

    &.move-enter-active,
    &.move-leave {
      transform: translate3d(0, 0, 0);
    }

    &.move-enter,
    &.move-leave-active {
      transform: translate3d(100%, 0, 0);
    }

    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%; // padding值设置100%的时候 == width

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .back {
        position: absolute;
        top: 10px;
        left: 0;

        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }

    .content {
      position: relative;
      padding: 18px;

      .title {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }

      .detail {
        margin-bottom: 18px;
        height: 10px;
        line-height: 10px;
        font-size: 0;

        .sell-count,
        .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .sell-count {
          margin-right: 12px;
        }
      }

      .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }

      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        border-radius: 12px;
        padding: 0 12px;
        height: 24px;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        background-color: rgb(0, 160, 220);
        box-sizing: border-box;
        transition: all .2s;
        opacity: 1;

        &.fade-enter,
        &.fade-leave-active {
          opacity: 0;
        }
      }
    }

    .info {
      padding: 18px;

      .title {
        margin-bottom: 6px;
        font-size: 14px;
        line-height: 16px;
        color: rgb(7, 17, 27);
      }

      .text {
        font-size: 12px;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }
  }
</style>
