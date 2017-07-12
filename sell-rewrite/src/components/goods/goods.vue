<template>
  <div class="goods">
    <div class="goods-content">
      <nav class="nav" ref="nav">
        <ul>
          <li @click="scrollLoc($event, index)" class="nav-item" v-for="(item, index) in goods"
              :class="{'active': currentIndex === index}">
          <span class="nav-item-text">
            <i class="icon" v-if="item.type!==-1" :class="iconMap[item.type]"></i>{{ item.name }}
          </span>
          </li>
        </ul>
      </nav>
      <div class="content" ref="content">
        <article>
          <section class="goods-item" v-for="item in goods">
            <h3 class="title">{{ item.name }}</h3>
            <ul class="item-wrapper">
              <li class="food-item" v-for="food in item.foods">
                <img class="food-image" :src="food.image" width="57" height="57">
                <div class="food-wrapper">
                  <h4 class="name">{{ food.name }}</h4>
                  <p v-if="food.description" class="description">{{ food.description }}</p>
                  <div class="sell-info">
                    <span class="sellCount">月售{{ food.sellCount }}份</span>
                    <span v-if="food.rating" class="rating">好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    ￥<span class="new-price">{{ food.price }}</span>
                    <del v-if="food.oldPrice" class="old-price">￥{{ food.oldPrice }}</del>
                  </div>
                </div>
                <v-carcontrol class="control" :food="food" @cartElement="cartElement"></v-carcontrol>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
    <v-shopcar ref="shopcar" :selectFoods="selectFoods" :seller="seller"></v-shopcar>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcar from 'components/shopcar/shopcar';
  import carcontrol from 'components/carcontrol/carcontrol';

  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        scrollY: 0,
        goodListHeight: []
      };
    },
    components: {
      'v-shopcar': shopcar,
      'v-carcontrol': carcontrol
    },
    computed: {
      currentIndex() {
        for (let i = this.goodListHeight.length - 1; i >= 0; i--) {
          if (this.scrollY >= this.goodListHeight[i]) {
            return i;
          }
        }
      },
      selectFoods() {
        let sFoods = [];
        let sign = false;

        for (let key in this.goods) {
          sign = true;
          break;
        }

        if (sign) {
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                sFoods.push(food);
              }
            });
          });
        }

        return sFoods;
      }
    },
    methods: {
      _betterScroll() {
        if (!this.nav) {
          this.nav = new BScroll(this.$refs.nav, {
            click: true
          });
        } else {
          this.nav.refresh();
        }

        if (!this.content) {
          this.content = new BScroll(this.$refs.content, {
            click: true,
            // 派发scroll事件
            probeType: 3
          });
        } else {
          this.content.refresh();
        }
      },
      _getInitValue() {
        this.content.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });

        let goodsItem = this.$refs.content.getElementsByClassName('goods-item');

        for (let i = 0; i < goodsItem.length; i++) {
          this.goodListHeight.push(goodsItem[i].offsetTop);
        }
      },
      scrollLoc(event, index) {
        if (!event._constructed) {
          return;
        }

        let goodList = this.$refs.content.getElementsByClassName('goods-item');
        this.content.scrollToElement(goodList[index], 300);
      },
      cartElement(el) {
        this.$refs.shopcar.getElement(el);
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;

          this.$nextTick(() => {
            this._betterScroll();
            this._getInitValue();
          });
        }
      });

      this.iconMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../commons/style/base";

  .goods {
    position: absolute;
    top: 174px;
    right: 0;
    bottom: 0;
    left: 0;

    .goods-content {
      display: flex;
      overflow: hidden;
      position: absolute;
      top: 0;
      bottom: 48px;
      border-top: 1px solid rgba(7, 17, 27, .1);
      width: 100%;

      .nav {
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f7;

        .nav-item {
          padding: 0 12px;
          width: 80px;
          height: 54px;
          font-size: 0;
          box-sizing: border-box;

          &:last-child .nav-item-text:after {
            border-top: 0;
          }

          &.active {
            background-color: #fff;

            .nav-item-text:after {
              border-top: 0;
            }
          }

          .nav-item-text {
            display: table-cell;
            .border-bottom-1px(rgba(7, 17, 27, .1));
            width: 56px;
            height: 54px;
            font-size: 12px;
            line-height: 14px;
            vertical-align: middle;
            color: rgb(7, 17, 27);

            .icon {
              display: inline-block;
              position: relative;
              top: 1px;
              margin-right: 2px;
              width: 12px;
              height: 12px;
              vertical-align: top;
              background-size: 12px;

              &.decrease {
                background-image: url("decrease_3@2x.png");
              }

              &.discount {
                background-image: url("discount_3@2x.png");
              }

              &.guarantee {
                background-image: url("guarantee_3@2x.png");
              }

              &.invoice {
                background-image: url("invoice_3@2x.png");
              }

              &.special {
                background-image: url("special_3@2x.png");
              }
            }
          }
        }
      }

      .content {
        flex: 1;

        .goods-item {
          .title {
            border-left: 1px solid #d9dde1;
            padding-left: 14px;
            height: 26px;
            font-size: 12px;
            line-height: 26px;
            color: rgb(147, 153, 159);
            background-color: #f3f5f7;
          }

          .item-wrapper {
            padding: 0 18px;
            box-sizing: border-box;

            .food-item {
              display: flex;
              position: relative;
              .border-bottom-1px(rgba(7, 17, 27, .1));
              padding: 18px 0;

              &:last-child:after {
                border-top: 0;
              }

              img {
                flex: 0 0 57px;
                width: 57px;
              }

              .food-wrapper {
                flex: 1;
                padding-left: 10px;
                font-size: 10px;
                line-height: 10px;
                color: rgb(147, 153, 159);

                .name {
                  margin-top: 2px;
                  font-size: 14px;
                  line-height: 14px;
                  color: rgb(7, 17, 27);
                }

                .description {
                  margin-top: 8px;
                  overflow: hidden;
                  height: 1em;
                }

                .sell-info {
                  margin-top: 8px;
                  font-size: 0;

                  .sellCount {
                    margin-right: 12px;
                    font-size: 10px;
                  }

                  .rating {
                    font-size: 10px;
                  }
                }

                .price {
                  margin-top: 8px;
                  color: rgb(240, 20, 20);

                  .new-price {
                    margin-right: 4px;
                    font-size: 14px;
                    font-weight: 700;
                  }

                  .old-price {
                    font-size: 10px;
                    font-weight: 700;
                    color: rgb(147, 153, 159);
                  }
                }
              }

              .control {
                position: absolute;
                right: 0;
                bottom: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
