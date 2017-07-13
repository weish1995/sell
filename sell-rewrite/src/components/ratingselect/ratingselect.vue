<template>
  <div class="ratingselect">
    <div class="select-btns">
      <span class="btn positive" :class="{'active':select===0}" @click="selectType($event, 0)">
        {{ type.all }}<span class="count">{{ ratings.length }}</span>
      </span>
      <span class="btn positive" :class="{'active':select===1}" @click="selectType($event, 1)">
        {{ type.positive }}<span class="count">{{ positiveRatings.length }}</span>
      </span>
      <span class="btn negative" :class="{'active':select===2}" @click="selectType($event, 2)">
        {{ type.negative }}<span class="count">{{ negativeRatings.length }}</span>
      </span>
    </div>
    <div class="only-content-wrapper">
      <i class="icon-check_circle" :class="{'active':onlyCont}" @click="isShow($event)"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 0;

  export default{
    props: {
      type: {
        type: Object,
        default() {
          return {
            'all': '全部',
            'positive': '推荐',
            'negative': '吐槽'
          };
        }
      },
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      onlyContent: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        select: ALL,
        onlyCont: this.onlyContent
      };
    },
    computed: {
      positiveRatings() {
        return this.ratings.filter((item) => {
          return item.rateType === 0;
        });
      },
      negativeRatings() {
        return this.ratings.filter((item) => {
          return item.rateType === 1;
        });
      }
    },
    methods: {
      selectType(event, count) {
        if (!event._constructed) {
          return;
        }

        this.select = count;
        this.$emit('select:type', count);
      },
      isShow(event) {
        if (!event._constructed) {
          return;
        }

        this.onlyCont = !this.onlyCont;
        this.$emit('select:only', this.onlyCont);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../commons/style/base';

  .ratingselect {
    .select-btns {
      .border-bottom-1px(rgba(7, 17, 27, .1));
      padding: 12px 0 18px 0;
      font-size: 0;

      .btn {
        margin-right: 8px;
        border-radius: 2px;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 32px;
        color: rgb(77, 85, 93);

        &.positive {
          background-color: rgba(0, 160, 220, .2);

          &.active {
            color: #fff;
            background-color: rgb(0, 160, 220);
          }
        }

        &.negative {
          background-color: rgba(77, 85, 93, .2);

          &.active {
            color: #fff;
            background-color: rgb(77, 85, 93);
          }
        }

        &:last-child {
          margin-right: 0;
        }

        .count {
          font-size: 8px;
        }
      }
    }

    .only-content-wrapper {
      padding: 12px 0;
      font-size: 0;

      .icon-check_circle {
        padding: 5px 5px 5px 0;
        font-size: 24px;
        line-height: 24px;
        color: rgb(147, 153, 159);

        &.active {
          color: rgb(0, 200, 80);
        }
      }

      .text {
        margin-left: 4px;
        font-size: 12px;
        vertical-align: top;
        line-height: 24px;
        color: rgb(147, 153, 159);
      }
    }
  }
</style>
