<template>
  <div class="goods">
    <nav class="nav" ref="nav">
      <ul>
        <li class="nav-item" v-for="(item, index) in goods" :class="{'active': currentIndex === index}">
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
          <ul>
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
            </li>
          </ul>
        </section>
      </article>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      };
    },
    computed: {
      currentIndex() {
        return 0;
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;

          this.$nextTick(() => {
            if (!this.nav) {
              this.nav = new BScroll(this.$refs.nav, {
                'click': true
              });
            } else {
              this.nav.refresh();
            }

            if (!this.content) {
              this.content = new BScroll(this.$refs.content, {
                'click': true
              });
            } else {
              this.content.refresh();
            }
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
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 174px;
    bottom: 50px;
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

        .food-item {
          display: flex;
          margin: 0 18px;
          .border-bottom-1px(rgba(7, 17, 27, .1));
          padding: 18px 0;

          &:last-child:after {
            border-top: 0;
          }

          .food-image {
            flex: 0 0 57px;
            width: 57px;
          }

          .food-wrapper {
            padding-left: 10px;
            color: rgb(147, 153, 159);

            .name {
              overflow: hidden;
              margin-top: 2px;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
              line-height: 14px;
              color: rgb(7, 17, 27);
            }

            .description {
              margin-top: 8px;
              font-size: 10px;
            }

            .sell-info {
              margin-top: 8px;
              font-size: 0;

              .sellCount,
              .rating {
                font-size: 10px;
              }

              .sellCount {
                margin-right: 12px;
              }
            }

            .price {
              margin-top: 8px;
              font-size: 10px;
              line-height: 24px;
              font-weight: 700;
              color: rgb(240, 20, 20);

              .new-price {
                font-size: 14px;
              }

              .old-price {
                color: rgb(147, 153, 159);
              }
            }
          }
        }
      }
    }
  }
</style>
