<template>
  <footer class="shopcar">
    <div class="info" :class="{'active': totalCount!==0}">
      <span class="icon-wrapper">
        <span class="icon-bg">
          <i class="icon-shopping_cart"></i>
        </span>
        <i class="foods-count" v-show="totalCount>0">{{ totalCount }}</i>
      </span>
      <span class="total-money">￥{{ totalMoney }}</span>
      <span class="delivery">另需￥{{ seller.deliveryPrice }}元配送费</span>
    </div>
    <div class="settlement" :class="{'active':seller.minPrice-totalMoney<=0}">
      <span class="total">{{ totalInfo }}</span>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      seller: {
        type: Object
      }
    },
    computed: {
      totalMoney() {
        let totalMoney = 0;
        this.selectFoods.forEach((item) => {
          totalMoney += item.count * item.price;
        });

        return totalMoney;
      },
      totalCount() {
        let totalCount = 0;
        this.selectFoods.forEach((item) => {
          totalCount += item.count;
        });

        return totalCount;
      },
      totalInfo() {
        if (!this.selectFoods || this.selectFoods.length === 0) {
          return '￥' + this.seller.minPrice + '起送';
        }

        let diff = this.seller.minPrice - this.totalMoney;

        if (diff > 0) {
          return '还差￥' + diff + '元起送';
        }

        return '去结算';
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .shopcar {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 48px;
    background-color: #141d27;

    .info {
      position: relative;
      flex: 1;
      padding: 12px 12px 12px 74px;
      line-height: 24px;
      font-size: 0;
      color: #80858a;

      .icon-wrapper {
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 18px;
        z-index: 101;
        border-radius: 50%;
        width: 58px;
        height: 58px;
        background-color: #141d27;

        .icon-bg {
          display: inline-flex;
          position: absolute;
          top: 7px;
          left: 7px;
          z-index: 102;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          justify-content: center;
          align-items: center;
          background-color: #2a333b;

          .icon-shopping_cart {
            font-size: 24px;
            line-height: 24px;
          }
        }

        .foods-count {
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 9px;
          padding: 4px 7px;
          font-size: 9px;
          font-style: normal;
          color: #fff;
          z-index: 203;
          background-color: #f01414;
        }
      }

      .total-money {
        border-right: 1px solid rgba(255, 255, 255, .1);
        padding: 0 12px 0 11px;
        font-size: 16px;
        font-weight: 700;
      }

      .delivery {
        padding-left: 12px;
        font-size: 10px;
        line-height: 24px;
      }

      &.active {
        .icon-wrapper {
          .icon-bg {
            background-color: #00a0dc;

            .icon-shopping_cart {
              color: #fff;
            }
          }
        }

        .total-money {
          color: #fff;
        }
      }
    }

    .settlement {
      flex: 0 0 105px;
      padding: 0 8px;
      width: 105px;
      text-align: center;
      line-height: 48px;
      background-color: #2b333b;
      box-sizing: border-box;

      &.active {
        background-color: #00b43c;

        .total {
          color: #fff;
        }
      }

      .total {
        font-size: 12px;
        font-weight: 700;
        line-height: 24px;
        color: rgba(255, 255, 255, .4);
      }
    }
  }
</style>
