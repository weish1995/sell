<template>
  <div class="rating" ref="rating">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"></v-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingselect :selType="selectType" :onlyCont="onlyContent"
                      :ratings="ratings" @ratingtype="typeChange" @ratingOnly="onlyChange"></v-ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-if="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar"/>
            </div>
            <div class="content">
              <h2 class="name">{{ rating.username }}</h2>
              <div class="str-wrapper">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{new Date(rating.rateTime).toLocaleString()}}</div>
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
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';

  const ERR_OK = 0;
  const ALL = 2;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    components: {
      'v-star': star,
      'v-split': split,
      'v-ratingselect': ratingselect
    },
    methods: {
      typeChange(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      },
      onlyChange(onlyC) {
        this.onlyContent = onlyC;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        }
        return type === this.selectType;
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;

          this.$nextTick(() => {
            if (!this.ratingScroll) {
              this.ratingScroll = new BScroll(this.$refs.rating, {
                'click': true
              });
            } else {
              this.ratingScroll.refresh();
            }
          });
        }
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/styles/mixin";

  .rating {
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;

    .overview {
      display: flex;
      padding: 18px 0;

      .overview-left {
        flex: 0 0 137px;
        border-right: 1px solid rgba(7, 17, 27, .1);
        padding-bottom: 6px;
        width: 137px;
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 110px;
          width: 110px;
        }

        .score {
          margin-bottom: 6px;
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
        }

        .title {
          margin-bottom: 8px;
          font-size: 12px;
          line-height: 12px;
          color: rgb(7, 17, 27);
        }

        .rank {
          font-size: 10px;
          line-height: 20px;
          color: rgb(147, 153, 159);
        }
      }

      .overview-right {
        flex: 1;
        padding-bottom: 6px;
        padding-left: 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 3px;
        }

        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          line-height: 18px;

          .title {
            display: inline-block;
            font-size: 12px;
            vertical-align: top;
            color: rgb(7, 17, 27);
          }

          .star {
            display: inline-block;
            margin: 0 12px;
            vertical-align: top;
          }

          .score {
            display: inline-block;
            font-size: 12px;
            vertical-align: top;
            color: rgb(255, 153, 0);
          }
        }

        .delivery-wrapper {
          font-size: 0;

          .title {
            font-size: 12px;
            color: rgb(7, 17, 27);
          }

          .time {
            margin-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }

    .rating-wrapper {
      padding: 0 18px;

      .rating-item {
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, .1));

        &:last-child:after {
          border-top: 0;
        }

        .avatar {
          margin-right: 12px;
          flex: 0 0 28px;
          width: 28px;

          img {
            border-radius: 50%;
          }
        }

        .content {
          position: relative;
          flex: 1;

          .name {
            margin-bottom: 4px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(7, 17, 27);
          }

          .str-wrapper {
            margin-bottom: 6px;
            font-size: 0;

            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }

            .delivery {
              display: inline-block;
              vertical-align: top;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }
          }

          .text {
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }

          .recommend {
            font-size: 0;
            line-height: 16px;

            .icon-thumb_up,
            .item {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }

            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }

            .item {
              border: 1px solid rgba(7, 17, 27, .1);
              border-radius: 1px;
              padding: 0 6px;
              color: rgb(147, 153, 159);
              background-color: #fff;
            }
          }

          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>
