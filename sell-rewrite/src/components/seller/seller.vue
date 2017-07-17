<template>
  <div class="seller" ref="sellersc">
    <div class="seller-container">
      <div class="seller-info">
        <h2 class="seller-name">{{ seller.name }}</h2>
        <div class="score-wrapper">
          <v-star class="score" :score="seller.score"></v-star>
          ({{ seller.ratingCount }})<span class="sale-count">月售{{ seller.sellCount }}单</span>
        </div>
        <div @click="toggleFavo($event)" class="collection" :class="{'active':favorite}">
          <i class="icon-favorite"></i>
          <span class="text">{{ favorite ? '已收藏' : '未收藏' }}</span>
        </div>
      </div>
      <ul class="sale-info">
        <li class="sale-item">
          <b class="text">起送价</b>
          <span class="data">{{ seller.minPrice }}<span class="data-comp">元</span></span>
        </li>
        <li class="sale-item">
          <b class="text">商家配送</b>
          <span class="data">{{ seller.deliveryPrice }}<span class="data-comp">元</span></span>
        </li>
        <li class="sale-item">
          <b class="text">平均配送时间</b>
          <span class="data">{{ seller.deliveryTime }}<span class="data-comp">分钟</span></span>
        </li>
      </ul>
      <v-split></v-split>
      <div class="bulletin-wrapper">
        <h3 class="seller-name">公告与活动</h3>
        <p class="content">{{ seller.bulletin }}</p>
        <ul class="supports-container">
          <li class="supports-list" v-for="item in seller.supports">
            <i class="icon" :class="supportsMap[item.type]"></i>
            <span class="text">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics-wrapper">
        <h2 class="seller-name">商家实景</h2>
        <div class="pics" ref="pics">
          <div class="pic-content" v-if="this.seller.pics">
            <img :src="item" v-for="item in seller.pics">
          </div>
        </div>
      </div>
      <v-split></v-split>
      <div class="infos">
        <h2 class="seller-name">商家信息</h2>
        <ul class="infos-wrapper">
          <li class="infos-item" v-for="item in seller.infos">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-star': star,
      'v-split': split
    },
    data() {
      return {
        favorite: false,
        supportsMap: []
      };
    },
    methods: {
      toggleFavo(event) {
        if (!event._constructed) {
          return;
        }

        this.favorite = !this.favorite;
      }
    },
    created() {
      this.$nextTick(() => {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.sellersc, {
            'click': true
          });
        } else {
          this.sellerScroll.refresh();
        }
      });

      this.supportsMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    mounted() {
      if (this.seller.pics) {
        let picContent = document.getElementsByClassName('pic-content')[0];
        picContent.style.width = (this.seller.pics.length * 126 - 6) + 'px';

        if (!this.pics) {
          this.pics = new BScroll(this.$refs.pics, {
            'scrollX': true
          });
        } else {
          this.pics.refresh();
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../commons/style/base';

  .seller {
    overflow: hidden;
    position: absolute;
    top: 174px;
    right: 0;
    bottom: 0;
    left: 0;

    .seller-name {
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }

    .seller-info {
      position: relative;
      margin: 0 18px;
      .border-bottom-1px(rgba(7, 17, 27, .1));
      padding: 18px 0;

      .score-wrapper {
        margin-top: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);

        .score {
          margin-right: 8px;
          vertical-align: top;
        }

        .sale-count {
          margin-left: 12px;
        }
      }

      .collection {
        position: absolute;
        top: 18px;
        right: 18px;
        text-align: center;

        &.active {
          .icon-favorite {
            color: rgb(240, 20, 20);
          }

          .text {
            color: rgb(77, 85, 93);
          }
        }

        .icon-favorite {
          font-size: 24px;
          line-height: 24px;
          color: #d4d6d9;
        }

        .text {
          display: block;
          margin-top: 4px;
          font-size: 10px;
          line-height: 1em;
          color: #93999f;
        }
      }
    }

    .sale-info {
      display: flex;
      padding: 18px 0;

      .sale-item {
        flex: 1;
        border-right: 1px solid rgba(7, 17, 27, .1);
        text-align: center;

        &:last-child {
          border-right: 0;
        }

        .text {
          display: block;
          font-size: 10px;
          line-height: 1em;
          color: rgb(147, 153, 159);
        }

        .data {
          display: block;
          margin-top: 4px;
          font-size: 24px;
          line-height: 1em;
          color: rgb(7, 17, 27);

          .data-comp {
            font-size: 10px;
          }
        }
      }
    }

    .bulletin-wrapper {
      padding: 18px 18px 0 18px;

      .content {
        margin-top: 8px;
        padding: 0 12px 18px;
        font-size: 12px;
        text-align: justify;
        line-height: 2em;
        color: rgb(240, 20, 20);
      }

      .supports-container {
        .supports-list {
          .border-top-1px(rgba(7, 17, 27, .1));
          padding: 16px 12px;
          font-size: 0;

          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-size: 16px;

            &.decrease {
              background-image: url("decrease_4@2x.png");
            }

            &.discount {
              background-image: url("discount_4@2x.png");
            }

            &.guarantee {
              background-image: url("guarantee_4@2x.png");
            }

            &.invoice {
              background-image: url("invoice_4@2x.png");
            }

            &.special {
              background-image: url("special_4@2x.png");
            }
          }

          .text {
            margin-left: 6px;
            font-size: 12px;
            vertical-align: top;
            line-height: 16px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }

    .pics-wrapper {
      padding: 18px;

      .pics {
        overflow: hidden;
        margin-top: 12px;
        white-space: nowrap;

        .pic-content {
          font-size: 0;

          img {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }

    .infos {
      padding: 18px;

      .infos-wrapper {
        margin-top: 12px;

        .infos-item {
          padding: 16px 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          .border-bottom-1px(rgba(7, 17, 27, .1));

          &:last-child:after {
            border-top: 0;
          }
        }
      }
    }
  }
</style>
