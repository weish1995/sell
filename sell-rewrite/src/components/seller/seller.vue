<template>
  <div class="seller" ref="sellerSc">
    <div class="seller-container">
      <div class="seller-info">
        <h2 class="name">{{ seller.name }}</h2>
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
          <b class="text">起送价</b>
          <span class="data">{{ seller.minPrice }}</span>
        </li>
        <li class="sale-item">
          <b class="text">起送价</b>
          <span class="data">{{ seller.minPrice }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-star': star
    },
    data() {
      return {
        favorite: false
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
          this.sellerScroll = new BScroll(this.$refs.sellerSc, {
            click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
      });
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

    .seller-info {
      position: relative;
      margin: 0 18px;
      .border-bottom-1px(rgba(7, 17, 27, .1));
      padding: 18px 0;

      .name {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }

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
  }
</style>
