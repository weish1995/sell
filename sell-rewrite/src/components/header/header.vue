<template>
  <header class="header">
    <div class="back">
      <img :src="seller.avatar">
    </div>
    <div class="info-wrapper">
      <img class="avatar" :src="seller.avatar" :title="seller.name" :alt="seller.name">
      <div class="info">
        <h1 class="title">
          <i class="icon"></i>
          <span class="text">{{ seller.name }}</span>
        </h1>
        <div class="desc">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <i class="icon" :class="supportsMap[seller.supports[0].type]"></i>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-num" @click="show">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin" @click="show">
      <i class="icon"></i>
      <p class="text">{{ seller.bulletin }}</p>
    </div>

    <!-- 弹出层 -->
    <transition name="slide">
      <div class="popup" v-show="popupShow" ref="popup">
        <div class="popup-content">
          <h2 class="title">{{ seller.name }}</h2>
          <div class="star-wrapper">
            <v-star class="score" :size="'lg'" :score="seller.score"></v-star>
          </div>
          <v-info-title text="优惠信息"></v-info-title>
          <ul class="supports-wrapper">
            <li class="supports-item" v-for="item in seller.supports">
              <i class="icon" :class="supportsMap[item.type]"></i>
              <span class="text">{{ item.description }}</span>
            </li>
          </ul>
          <v-info-title text="商家公告"></v-info-title>
          <p class="bulletin-content">{{ seller.bulletin }}</p>
          <div class="close">
            <i class="icon-close" @click="hide($event)"></i>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import infoTitle from 'components/infoTitle/infoTitle';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        popupShow: false
      };
    },
    components: {
      'v-star': star,
      'v-info-title': infoTitle
    },
    created() {
      this.supportsMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      hide(event) {
        if (!event._constructed) {
          return;
        }
        this.popupShow = false;
      },
      show() {
        this.popupShow = true;

        this.$nextTick(() => {
          if (!this.popup) {
            this.popup = new BScroll(this.$refs.popup, {
              'click': true
            });
          } else {
            this.popup.refresh();
          }
        });
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .header {
    overflow: hidden;
    position: relative;
    background-color: rgba(7, 17, 27, .5);

    .back {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      filter: blur(10px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info-wrapper {
      position: relative;
      padding: 24px 0 18px 24px;
      font-size: 0;

      .avatar {
        display: inline-block;
        border-radius: 2px;
        width: 64px;
        height: 64px;
      }

      .info {
        display: inline-block;
        margin-left: 16px;
        padding: 2px 0;
        vertical-align: top;

        .title {
          .icon {
            display: inline-block;
            border-radius: 1px;
            width: 30px;
            height: 18px;
            background-image: url("brand.png");
            background-size: 30px 18px;
          }

          .text {
            display: inline-block;
            margin-left: 6px;
            font-size: 16px;
            vertical-align: top;
            line-height: 18px;
            font-weight: 700;
            color: #fff;
          }
        }

        .desc {
          margin-top: 8px;
          font-size: 12px;
          line-height: 12px;
          color: #fff;
        }

        .support {
          margin-top: 10px;

          .icon {
            display: inline-block;
            border-radius: 1px;
            width: 12px;
            height: 12px;
            background-size: 12px;
          }

          .text {
            margin-left: 4px;
            font-size: 10px;
            line-height: 12px;
            vertical-align: top;
            color: #fff;
          }
        }
      }

      .support-num {
        display: inline-block;
        position: absolute;
        right: 12px;
        bottom: 18px;
        border-radius: 12px;
        padding: 7px 8px;
        background-color: rgba(0, 0, 0, .2);

        .count {
          display: inline-block;
          font-size: 10px;
          vertical-align: top;
          line-height: 12px;
          color: #fff;
        }

        .icon-keyboard_arrow_right {
          margin-left: 2px;
          font-size: 12px;
          color: #fff;
        }
      }
    }

    .bulletin {
      display: flex;
      padding: 0 12px;
      height: 28px;
      font-size: 0;
      background-color: rgba(7, 17, 27, .2);

      .icon {
        display: inline-block;
        margin-top: 8px;
        flex: 0 0 22px;
        width: 22px;
        height: 12px;
        background-image: url("bulletin@2x.png");
        background-size: 22px 12px;
      }

      .text {
        overflow: hidden;
        padding-left: 4px;
        flex: 1;
        font-size: 10px;
        line-height: 28px;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: top;
        color: #fff;
      }
    }

    .icon {
      &.decrease {
        background-image: url("decrease_1@2x.png");
      }

      &.discount {
        background-image: url("discount_1@2x.png");
      }

      &.guarantee {
        background-image: url("guarantee_1@2x.png");
      }

      &.invoice {
        background-image: url("invoice_1@2x.png");
      }

      &.special {
        background-image: url("special_1@2x.png");
      }
    }

    .popup {
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
      height: 100%;
      background-color: rgba(7, 17, 27, .8);
      backdrop-filter: blur(10px);
      transition: all .5s;

      &.slide-enter,
      &.slide-leave-active {
        top: -100%;
      }

      .popup-content {
        position: relative;
        padding: 64px 36px 96px;
        width: 100%;
        min-height: 100%;
        box-sizing: border-box;
        color: #fff;

        .title {
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          line-height: 16px;
        }

        .star-wrapper {
          margin-top: 16px;
          text-align: center;

          .score {
            padding: 2px 0;
          }
        }

        .supports-wrapper {
          padding: 0 12px;

          .supports-item {
            margin-top: 12px;
            font-size: 0;

            &:first-child {
              margin-top: 0;
            }

            .icon {
              display: inline-block;
              position: relative;
              top: -2px;
              width: 16px;
              height: 16px;
              background-size: 16px;
            }

            .text {
              margin-left: 6px;
              font-size: 12px;
              line-height: 12px;
              vertical-align: top;
            }
          }
        }

        .bulletin-content {
          padding: 0 12px;
          font-size: 12px;
          text-align: justify;
          line-height: 2em;
        }

        .close {
          position: absolute;
          bottom: 32px;
          left: 0;
          width: 100%;
          text-align: center;

          .icon-close {
            font-size: 32px;
          }
        }
      }
    }
  }
</style>
