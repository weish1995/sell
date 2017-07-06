<template>
  <div class="seller" ref="sellerS">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
      </div>
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
    created() {
      this.$nextTick(() => {
        this.scrollSeller = new BScroll(this.$refs.sellerS, {});
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/styles/mixin";

  .seller {
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;

    .overview {
      padding: 18px;

      .title {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }

      .desc {
        padding-bottom: 18px;
        line-height: 18px;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, .1));

        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }

        .text {
          display: inline-block;
          margin-right: 12px;
          font-size: 10px;
          color: rgb(74, 85, 93);
        }
      }

      .remark {
        display: flex;
        padding-top: 18px;

        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, .1);

          h2 {
            margin-bottom: 10px;
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }

          .content {
            font-size: 10px;
            line-height: 24px;
            color: rgb(7, 17, 27);

            .stress {
              font-size: 24px;
            }
          }
        }

        .block:last-child {
          border: none;
        }
      }
    }
  }
</style>
