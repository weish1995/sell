<template>
  <div class="star" :class="className">
    <i class="star-item" v-for="item in stars" :class="item"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      size: {
        type: String,
        default: ''
      },
      score: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 5
      }
    },
    computed: {
      className() {
        return this.size === '' ? '' : 'star-' + this.size;
      },
      stars() {
        let result = [];
        let onCount = Math.floor(this.score);
        let halfSign = Math.floor(this.score * 2) % 2 === 0 ? 'off' : 'half';

        for (let i = 0; i < onCount; i++) {
          result.push('on');
        }

        result.push(halfSign);
        for (let i = onCount + 1; i < this.count; i++) {
          result.push('off');
        }

        return result;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .star {
    display: inline-block;
    font-size: 0;

    .star-item {
      display: inline-block;
      margin-right: 8px;
      width: 15px;
      height: 15px;
      background-size: 15px;
      background-repeat: no-repeat;

      &.star-item:last-child {
        margin-right: 0;
      }

      &.on {
        background-image: url("star36_on@2x.png");
      }

      &.off {
        background-image: url("star36_off@2x.png");
      }

      &.half {
        background-image: url("star36_half@2x.png");
      }
    }

    &.star-lg {
      .star-item {
        margin-right: 22px;
        width: 20px;
        height: 20px;
        background-size: 20px;

        &.on {
          background-image: url("star48_on@2x.png");
        }

        &.off {
          background-image: url("star48_off@2x.png");
        }

        &.half {
          background-image: url("star48_half@2x.png");
        }
      }
    }

    &.star-sm {
      .star-item {
        margin-right: 3px;
        width: 10px;
        height: 10px;
        background-size: 10px;

        &.on {
          background-image: url("star24_on@2x.png");
        }

        &.off {
          background-image: url("star24_off@2x.png");
        }

        &.half {
          background-image: url("star24_half@2x.png");
        }
      }
    }
  }
</style>
