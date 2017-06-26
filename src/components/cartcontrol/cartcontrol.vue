<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // 添加属性，必须使用Vue.set
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }

        this.$emit('cart', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .cartcontrol {
    font-size: 0;

    .cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all .4s linear;

      &.move-enter-active,
      &.move-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      &.move-enter,
      &.move-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);

        .inner {
          transform: rotate(360deg);
        }
      }

      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        transition: all .4s linear;
        transform: rotate(0);
      }
    }

    .cart-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }

    .cart-count {
      display: inline-block;
      padding-top: 6px;
      width: 12px;
      font-size: 10px;
      text-align: center;
      line-height: 24px;
      vertical-align: top;
      color: rgb(147, 153, 159);
    }
  }
</style>
