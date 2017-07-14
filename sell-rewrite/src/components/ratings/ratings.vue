<template>
  <div class="ratings" ref="rate">
    <div class="ratings-container">
      <div class="ratings-info">
        <div class="left">
          <h2 class="score">{{ seller.score }}</h2>
          <div class="text">综合评分</div>
          <div class="rank-rate">高于周围商家{{ seller.rankRate }}%</div>
        </div>
        <ul class="right">
          <li class="right-item">
            <span class="text">服务态度</span>
            <v-star class="score-star" :score="seller.serviceScore"></v-star>
            <span class="score-text">{{ seller.serviceScore }}</span>
          </li>
          <li class="right-item">
            <span class="text">商品评分</span>
            <v-star class="score-star" :score="seller.foodScore"></v-star>
            <span class="score-text">{{ seller.foodScore }}</span>
          </li>
          <li class="right-item">
            <span class="text">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <v-ratingselect @select:type="editType" @select:only="editOnly" class="ratings-select" :type="typeSelect"
                      :ratings="ratings"></v-ratingselect>
      <ul class="rating-content">
        <li class="rating-list" v-for="rating in ratings" v-show="ratingShow(rating)">
          <div class="avatar-wrapper">
            <img class="avatar" :src="rating.avatar">
          </div>
          <div class="info-wrapper">
            <div class="name-wrapper">
              <span class="name">{{ rating.username }}</span>
              <time class="time">{{ new Date(rating.rateTime).toLocaleString() }}</time>
            </div>
            <div class="score-wrapper">
              <v-star size="sm" :score="rating.score"></v-star>
              <span v-if="rating.deliveryTime!==''" class="delivery">{{ rating.deliveryTime }}分钟送达</span>
            </div>
            <p class="text">{{ rating.text }}</p>
            <div class="command" v-if="rating.recommend&&rating.recommend.length>0">
              <i class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
              <span class="command-item" v-for="item in rating.recommend">{{ item }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';

  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        typeSelect: {
          'all': '全部',
          'positive': '满意',
          'negative': '不满意'
        },
        onlyContent: true,
        type: 0
      };
    },
    components: {
      'v-star': star,
      'v-split': split,
      'v-ratingselect': ratingselect
    },
    methods: {
      editType(count) {
        this.type = count;
        this.$nextTick(() => {
          this.ratingScro.refresh();
        });
      },
      editOnly(only) {
        this.onlyContent = only;
        this.$nextTick(() => {
          this.ratingScro.refresh();
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
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;

          this.$nextTick(() => {
            if (!this.ratingScro) {
              this.ratingScro = new BScroll(this.$refs.rate, {
                'click': true
              });
            } else {
              this.ratingScro.refresh();
            }
          });
        }
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../commons/style/base';

  .ratings {
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;

    .ratings-info {
      display: flex;
      padding: 18px 0;

      .left {
        flex: 0 0 137px;
        border-right: 1px solid rgba(7, 17, 27, .1);
        width: 137px;
        text-align: center;

        @media screen and (max-width: 374px) {
          flex: 0 0 110px;
          width: 110px;
        }

        .score {
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
        }

        .text {
          font-size: 12px;
          line-height: 24px;
          color: rgb(7, 17, 27);
        }

        .rank-rate {
          font-size: 10px;
          line-height: 2em;
          color: rgb(147, 153, 159);
        }
      }

      .right {
        flex: 1;

        .right-item {
          padding-left: 20px;
          font-size: 0;
          line-height: 18px;

          @media screen and (max-width: 374px) {
            padding-left: 4px;
          }

          .text {
            font-size: 12px;
            color: rgb(7, 17, 27);
          }

          .score-star {
            margin-left: 12px;
            vertical-align: middle;
          }

          .score-text {
            margin-left: 12px;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }

          .delivery {
            margin-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }

    .ratings-select {
      padding: 0 18px;
    }

    .rating-content {
      .border-top-1px(rgba(7, 17, 27, .1));

      .rating-list {
        display: flex;
        .border-bottom-1px(rgba(7, 17, 27, .1));
        padding: 18px;

        .avatar-wrapper {
          flex: 0 0 28px;
          width: 28px;

          .avatar {
            border-radius: 50%;
            width: 28px;
            height: 28px;
          }
        }

        .info-wrapper {
          flex: 1;
          padding-left: 12px;

          .name-wrapper {
            overflow: hidden;
            font-size: 10px;
            line-height: 12px;

            .name {
              float: left;
              color: rgb(7, 17, 27);
            }

            .time {
              float: right;
              color: rgb(147, 153, 159);
            }
          }

          .score-wrapper {
            margin-top: 4px;
            font-size: 0;
            line-height: 1em;
            color: rgb(147, 153, 159);

            .delivery {
              margin-left: 6px;
              font-size: 10px;
            }
          }

          .text {
            margin-top: 6px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
          }

          .command {
            margin-top: 8px;
            font-size: 0;
            line-height: 16px;

            .icon-thumb_up {
              vertical-align: top;
              font-size: 12px;
              color: rgb(0, 160, 220);
            }

            .icon-thumb_down {
              vertical-align: top;
              font-size: 12px;
              color: rgb(183, 187, 191);
            }

            .command-item {
              display: inline-block;
              margin-left: 8px;
              border: 1px solid rgba(7, 17, 27, .1);
              border-radius: 2px;
              padding: 0 6px;
              font-size: 9px;
              line-height: 16px;
              color: rgb(147, 153, 159);
              background-color: #fff;
            }
          }
        }
      }
    }
  }
</style>
