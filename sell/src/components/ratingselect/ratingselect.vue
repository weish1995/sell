<template>
  <div class="rating-select">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'active':selectType==2}">{{ desc.all }}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active':selectType==0}">{{ desc.positive }}<span
        class="count">{{ positives.length }}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active':selectType==1}">{{ desc.nagative }}<span
        class="count">{{ negatives.length }}</span></span>
    </div>
    <div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default{
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selType: {
        type: Number,
        default: ALL
      },
      onlyCont: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            nagative: '不满意'
          };
        }
      }
    },
    data() {
      return {
        selectType: this.selType,
        onlyContent: this.onlyCont
      };
    },
    computed: {
      positives() {
        return this.ratings.filter((item) => {
          return item.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((item) => {
          return item.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }

        this.selectType = type;
        this.$emit('ratingtype', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }

        this.onlyContent = !this.onlyContent;
        this.$emit('ratingOnly', this.onlyContent);
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/styles/mixin';

  .rating-select {
    .rating-type {
      margin: 0 18px;
      padding: 18px 0;
      font-size: 0;
      .border-1px(rgba(7, 17, 27, .1));

      .block {
        display: inline-block;
        margin-right: 8px;
        border-radius: 1px;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 16px;
        color: rgb(77, 85, 93);

        &.active {
          color: #fff;
        }

        &.positive {
          background-color: rgba(0, 160, 220, .2);

          &.active {
            background-color: rgb(0, 160, 220);
          }
        }

        &.negative {
          background-color: rgba(77, 85, 93, .2);

          &.active {
            background-color: rgb(77, 85, 93);
          }
        }

        .count {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }

    .switch {
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      padding: 12px 18px;
      font-size: 0;
      line-height: 24px;
      color: rgb(147, 153, 159);

      .icon-check_circle {
        display: inline-block;
        margin-right: 4px;
        font-size: 24px;
        vertical-align: top;
      }

      &.on .icon-check_circle {
        color: #00c850;
      }

      .text {
        display: inline-block;
        font-size: 12px;
        vertical-align: top;
      }
    }
  }
</style>
