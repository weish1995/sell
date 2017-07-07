<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <i class="brand"></i>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}
        </div>
        <div v-if="seller.supports" class="support">
          <i class="icon" :class="classMap[seller.supports[0].type]"></i>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <i class="bulletin-title"></i><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <v-title title="优惠信息"></v-title>
            <ul v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{ item.description}}</span>
              </li>
            </ul>
            <v-title title="商家公告"></v-title>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import title from 'components/title/title';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'v-star': star,
      'v-title': title
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import url("../../common/styles/mixin");

  @content-width: 80%;

  .header {
    overflow: hidden;
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, .5);

    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0; // 消除空白字符

      .avatar {
        display: inline-block;
        vertical-align: top;

        img {
          border-radius: 2px;
        }
      }

      .content {
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;

        .title {
          margin: 2px 0 8px 0;

          .brand {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: top;
            .bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }

          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: 700;
          }
        }

        .description {
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 12px;
        }

        .support {
          .icon {
            display: inline-block;
            margin-right: 4px;
            width: 12px;
            height: 12px;
            vertical-align: top;
            background-size: 12px;
            background-repeat: no-repeat;

            &.decrease {
              .bg-image("decrease_1");
            }

            &.discount {
              .bg-image("discount_1");
            }

            &.guarantee {
              .bg-image("guarantee_1");
            }

            &.invoice {
              .bg-image("invoice_1");
            }

            &.special {
              .bg-image("special_1");
            }
          }

          .text {
            font-size: 10px;
            line-height: 12px;
            /*vertical-align: top;*/
            color: #fff;
          }
        }
      }

      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        border-radius: 14px;
        padding: 0 8px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        background-color: rgba(0, 0, 0, .2);

        .count {
          font-size: 10px;
        }

        .icon-keyboard_arrow_right {
          display: inline-block;
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
        }
      }
    }

    .bulletin-wrapper {
      overflow: hidden;
      position: relative;
      padding: 0 22px 0 12px;
      height: 28px;
      line-height: 28px;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: rgba(7, 17, 27, .2);

      .bulletin-title {
        display: inline-block;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        vertical-align: top;
        .bg-image("bulletin");
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }

      .bulletin-text {
        margin: 0 4px;
        font-size: 10px;
        vertical-align: middle;
      }

      .icon-keyboard_arrow_right {
        position: absolute;
        top: 8px;
        right: 12px;
        font-size: 10px;
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }

    .detail {
      overflow: auto;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      transition: all .5s ease;
      background-color: rgba(7, 17, 27, .8);
      backdrop-filter: blur(10px);

      &.fade-leave,
      &.fade-enter-active {
        opacity: 1;
      }

      &.fade-enter,
      &.fade-leave-active {
        opacity: 0;
      }

      .detail-wrapper {
        width: 100%;
        min-height: 100%;

        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;

          .name {
            font-size: 16px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
          }

          .star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }

          .supports {
            margin: 0 auto;
            width: @content-width;

            .supports-item {
              margin-bottom: 12px;
              padding: 0 12px;
              font-size: 0;

              &:last-child {
                margin-bottom: 0;
              }

              .icon {
                display: inline-block;
                margin-right: 6px;
                width: 16px;
                height: 16px;
                vertical-align: top;
                background-size: 16px;
                background-repeat: no-repeat;

                &.decrease {
                  .bg-image("decrease_2");
                }
                &.discount {
                  .bg-image("discount_2");
                }
                &.guarantee {
                  .bg-image("guarantee_2");
                }
                &.invoice {
                  .bg-image("invoice_2");
                }
                &.special {
                  .bg-image("special_2");
                }
              }

              .text {
                font-size: 12px;
                line-height: 16px;
              }
            }
          }

          .bulletin {
            margin: 0 auto;
            width: @content-width;

            .content {
              padding: 0 12px;
              line-height: 2em;
              font-size: 12px;
            }
          }
        }
      }

      .detail-close {
        position: relative;
        margin: -64px auto 0;
        text-align: center;
        line-height: 64px;
        font-size: 32px;
        clear: both;
      }
    }
  }
</style>
