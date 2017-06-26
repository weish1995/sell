<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item in goods" class="food-list foods-list-hook">
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
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food" @cart="cartAdd"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcar ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
               :select-foods="selectFoods"></v-shopcar>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcar from 'components/shopcar/shopcar';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: {},
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length - 1; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];

          if (this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }

        return 0;
      },
      selectFoods() {
        let foods = [];
        let sign = false;

        for (let key in this.goods) {
          sign = true;
          break;
        }

        if (sign) {
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
            });
          });
        }

        return foods;
      }
    },
    components: {
      'v-shopcar': shopcar,
      'v-cartcontrol': cartcontrol
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foods, {
          probeType: 3,
          click: true
        });

        // 实时监听scroll
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foods.getElementsByClassName('foods-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        // 浏览器原生事件
        if (!event._constructed) {
          return;
        }

        let foodList = this.$refs.foods.getElementsByClassName('foods-list-hook');
        let ref = foodList[index];
        this.foodsScroll.scrollToElement(ref, 300);
      },
      cartAdd(e) {
        // 体验优化，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(e);
        });
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
    top: 175px;
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

        &.current {
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background-color: #fff;

          .text {
            font-weight: 700;
            &:after {
              border-top: 0;
            }
          }
        }

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
            line-height: 12px;
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

          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
