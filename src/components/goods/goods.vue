<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h3 class="title">{{ item.name }}</h3>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h4 class="name">{{ food.name }}</h4>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <del class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</del>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: {}
      };
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu, {});
        this.foodsScroll = new BScroll(this.$refs.foods, {});
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/styles/mixin";

  .goods {
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;

    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;

      .menu-item {
        display: table;
        padding: 0 12px;
        width: 56px;
        height: 54px;
        line-height: 14px;

        .icon {
          display: inline-block;
          margin-right: 2px;
          width: 12px;
          height: 12px;
          vertical-align: top;
          background-size: 12px;
          background-repeat: no-repeat;

          &.decrease {
            .bg-image("decrease_3");
          }

          &.discount {
            .bg-image("discount_3");
          }

          &.guarantee {
            .bg-image("guarantee_3");
          }

          &.invoice {
            .bg-image("invoice_3");
          }

          &.special {
            .bg-image("special_3");
          }
        }

        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          .border-1px(rgba(7, 17, 27, .1));
        }
      }
    }

    .foods-wrapper {
      flex: 1;

      .title {
        border-left: 2px solid #d9dde1;
        padding-left: 14px;
        height: 26px;
        font-size: 12px;
        line-height: 26px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }

      .food-item {
        display: flex;
        padding: 18px;
        .border-1px(rgba(7, 17, 27, .1));

        &:last-child:after {
          border-top: 0;
        }

        .icon {
          margin-right: 10px;
          flex: 0 0 57px;
        }

        .content {
          flex: 1;

          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }

          .desc,
          .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }

          .desc {
            margin-bottom: 8px;
          }

          .extra {
            .count {
              font-size: 10px;
            }
          }

          .price {
            font-weight: 700;
            line-height: 24px;

            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }

            .old {
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
</style>
