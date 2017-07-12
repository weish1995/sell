<template>
  <div class="carcontrol">
    <transition name="move">
      <i class="icon icon-remove_circle_outline" v-show="food.count>0" @click="reduceCount($event)"></i>
    </transition>
    <span class="count" v-show="food.count>0">{{ food.count }}</span>
    <i class="icon icon-add_circle" @click="addCount($event)"></i>
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
      addCount(event) {
        if (!event._constructed) {
          return;
        }

        if (this.food.count) {
          this.food.count += 1;
        } else {
          Vue.set(this.food, 'count', 1);
        }

        this.$emit('cartElement', event.target);
      },
      reduceCount(event) {
        if (!event._constructed) {
          return;
        }

        if (this.food.count > 0) {
          this.food.count -= 1;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .carcontrol {
    display: inline-block;
    font-size: 0;

    .icon {
      display: inline-block;
      padding: 5px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);

      &.icon-remove_circle_outline {
        opacity: 1;
        transition: all .4s linear;
        transform: translate3d(0, 0, 0) rotate(0);

        &.move-enter,
        &.move-leave-to {
          transform: translate3d(24px, 0, 0) rotate(360deg);
          opacity: 0;
        }

        &.move-leave,
        &.move-enter-to {
          transform: translate3d(0, 0, 0) rotate(0);
        }
      }
    }

    .count {
      display: inline-block;
      width: 14px;
      font-size: 10px;
      text-align: center;
      vertical-align: top;
      line-height: 34px;
      color: rgb(147, 153, 159);
    }
  }
</style>
