<template>
  <transition name="slide">
    <div class="food" ref="foodScroll" v-show="isShow">
      <div class="food-content">
        <i class="icon-arrow_lift" @click="hide($event)"></i>
        <div class="image-wrapper">
          <img :src="food.image">
        </div>
        <div class="basic-info">
          <h2 class="content-title">{{ food.name }}</h2>
          <div class="sale">
            月售{{ food.sellCount }}份<span v-if="food.rating!==''">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="new-price">￥<span>{{ food.price }}</span></span>
            <del class="old-price" v-if="food.oldPrice!==''">￥{{ food.oldPrice }}</del>
          </div>
          <div class="select shop-empty" @click="foodInit($event)" v-show="!food.count||food.count===0">加入购物车</div>
          <v-carcontrol class="select control" :food="food" @cartElement="cartElement"></v-carcontrol>
        </div>
        <v-split></v-split>
        <div class="desc-wrapper">
          <h2 class="content-title">商品介绍</h2>
          <p class="desc">{{ food.info }}</p>
        </div>
        <v-split></v-split>
        <div class="food-ratings">
          <h2 class="content-title">商品评价</h2>
          <v-ratingselect @select:type="editType" @select:only="editOnly" :ratings="food.ratings"
                          :onlyContent="onlyContent"></v-ratingselect>
        </div>
        <ul class="rat-wrapper">
          <li class="rat-list" v-for="rating in food.ratings" v-show="ratingShow(rating)">
            <div class="info">
              <time class="time">{{ new Date(rating.rateTime).toLocaleString() }}</time>
              <div class="user">
                <span class="username">{{ rating.username }}</span>
                <img class="avatar" :src="rating.avatar">
              </div>
            </div>
            <div class="content">
              <i class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>{{ rating.text
              }}
            </div>
          </li>
          <li class="no-ratings" v-if="!food.ratings||food.ratings.length <= 0">暂无评价</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import carcontrol from 'components/carcontrol/carcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';

  export default {
    data() {
      return {
        isShow: false,
        onlyContent: true,
        type: 0
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    components: {
      'v-carcontrol': carcontrol,
      'v-split': split,
      'v-ratingselect': ratingselect
    },
    methods: {
      show() {
        this.isShow = true;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.foodScroll, {
              click: true
            });
          } else {
            this.foodScroll.refresh();
          }
        });
      },
      hide(event) {
        if (!event._constructed) {
          return;
        }

        this.isShow = false;
      },
      foodInit(event) {
        if (!event._constructed) {
          return;
        }

        if (this.count) {
          this.food.count = 1;
        } else {
          Vue.set(this.food, 'count', 1);
        }

        this.$emit('food:add', event.target);
      },
      cartElement(el) {
        this.$emit('food:add', el);
      },
      editType(count) {
        this.type = count;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      editOnly(only) {
        this.onlyContent = only;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      ratingShow(rating) {
        if (this.type === 0) {
          if (!this.onlyContent) {
            return true;
          }

          if (rating.text !== '') {
            return true;
          }
        }

        if (this.type - 1 === rating.rateType) {
          if (!this.onlyContent) {
            return true;
          }

          if (rating.text !== '') {
            return true;
          }
        }

        return false;
      }
    },
    created() {
      this.$nextTick(() => {
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          click: true
        });
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../commons/style/base';

  .food {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 48px;
    left: 0;
    z-index: 90;
    background-color: #fff;
    transition: all .5s;

    &.slide-enter,
    &.slide-leave-to {
      transform: translateX(100%);
    }

    .icon-arrow_lift {
      position: absolute;
      top: 14px;
      left: 7px;
      z-index: 9999;
      font-size: 20px;
      color: #fff;
    }

    .image-wrapper {
      position: relative;
      padding-top: 100%;
      width: 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .content-title {
      margin-bottom: 6px;
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }

    .basic-info {
      position: relative;
      padding: 18px;

      .sale {
        margin-top: 8px;
        font-size: 10px;
        line-height: 1em;
        color: rgb(147, 153, 159);

        span {
          margin-left: 12px;
        }
      }

      .price {
        margin-top: 18px;
        font-size: 10px;

        .new-price {
          font-weight: 700;
          color: rgb(240, 20, 20);

          span {
            font-size: 14px;
          }
        }

        .old-price {
          margin-left: 12px;
          font-weight: 700;
          color: rgb(147, 153, 159);
        }
      }

      .select {
        position: absolute;
        right: 18px;
        bottom: 18px;

        &.shop-empty {
          z-index: 92;
          border-radius: 12px;
          padding: 6px 12px;
          font-size: 10px;
          color: #fff;
          background-color: rgb(0, 160, 220);
        }

        &.control {
          bottom: 11px;
          z-index: 91;
        }
      }
    }

    .desc-wrapper {
      padding: 18px;

      .desc {
        padding: 0 8px;
        font-size: 12px;
        text-align: justify;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }

    .food-ratings {
      padding: 18px 18px 0 18px;
    }

    .rat-wrapper {
      .border-top-1px(rgba(7, 17, 27, .1));
      padding: 0 18px;

      .rat-list {
        .border-bottom-1px(rgba(7, 17, 27, .1));
        padding: 16px 0;

        &:last-child:after {
          border-top: 0;
        }

        .info {
          overflow: hidden;
          font-size: 10px;
          line-height: 24px;
          color: rgb(147, 153, 159);

          .time {
            float: left;
          }

          .user {
            float: right;
            font-size: 0;

            .username {
              font-size: 10px;
            }

            .avatar {
              margin-left: 6px;
              border-radius: 50%;
              width: 12px;
              height: 12px;
            }
          }
        }

        .content {
          font-size: 12px;
          line-height: 32px;
          color: rgb(7, 17, 27);

          .icon {
            margin-right: 4px;
            font-size: 12px;
            line-height: 24px;
            color: rgb(147, 153, 159);

            &.icon-thumb_up {
              color: rgb(0, 160, 220);
            }
          }
        }
      }

      .no-ratings {
        padding: 18px 0;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
    }
  }
</style>
