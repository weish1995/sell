<template>
  <div class="shoppingcar">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{ payDesc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });

        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });

        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        }

        if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`;
        }

        return '去结算';
      },
      payClass() {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        }

        return 'not-enough';
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .shoppingcar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 48px;

    .content {
      display: flex;
      color: rgba(255, 255, 255, .4);
      background-color: #141d27;

      .content-left {
        flex: 1;
        font-size: 0;

        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -8px;
          margin: 0 12px;
          border-radius: 50%;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: top;
          background-color: #141d27;

          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: #2b343c;

            &.highlight {
              background-color: rgb(0, 160, 220);

              .icon-shopping_cart {
                color: #fff;
              }
            }

            .icon-shopping_cart {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
            }
          }

          .num {
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 16px;
            width: 24px;
            height: 16px;
            font-size: 9px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
            color: #fff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }

        .price {
          display: inline-block;
          margin-top: 12px;
          border-right: 1px solid rgba(255, 255, 255, .1);
          padding-right: 12px;
          font-size: 16px;
          font-weight: 700;
          vertical-align: top;
          line-height: 24px;
          box-sizing: border-box;

          &.highlight {
            color: #fff;
          }
        }

        .desc {
          display: inline-block;
          margin-top: 14px;
          margin-left: 12px;
          font-size: 10px;
          line-height: 20px;
          vertical-align: top;

        }
      }

      .content-right {
        width: 105px;
        flex: 0 0 105px;

        .pay {
          height: 48px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          line-height: 48px;

          &.not-enough {
            background-color: #2b333b;
          }

          &.enough {
            color: #fff;
            background-color: #00b43c;
          }
        }
      }
    }
  }
</style>
