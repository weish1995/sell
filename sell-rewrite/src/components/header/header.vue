<template>
  <header class="header">
    <div class="back">
      <img :src="seller.avatar">
    </div>
    <div class="info-wrapper">
      <img class="avatar" :src="seller.avatar" :title="seller.name" :alt="seller.name">
      <div class="info">
        <h1 class="title">
          <i class="icon"></i>
          <span class="text">{{ seller.name }}</span>
        </h1>
        <div class="desc">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <i class="icon"></i>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-num">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin">
      <i class="icon"></i>
      <p class="text">{{ seller.bulletin }}</p>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      seller: {
        type: Object
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .header {
    overflow: hidden;
    position: relative;
    background-color: rgba(7, 17, 27, .5);

    .back {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      filter: blur(10px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info-wrapper {
      position: relative;
      padding: 24px 0 18px 24px;
      font-size: 0;

      .avatar {
        display: inline-block;
        border-radius: 2px;
        width: 64px;
        height: 64px;
      }

      .info {
        display: inline-block;
        margin-left: 16px;
        padding: 2px 0;
        vertical-align: top;

        .title {
          .icon {
            display: inline-block;
            border-radius: 1px;
            width: 30px;
            height: 18px;
            background-image: url("brand.png");
            background-size: 30px 18px;
          }

          .text {
            display: inline-block;
            margin-left: 6px;
            font-size: 16px;
            vertical-align: top;
            line-height: 18px;
            font-weight: 700;
            color: #fff;
          }
        }

        .desc {
          margin-top: 8px;
          font-size: 12px;
          line-height: 12px;
          color: #fff;
        }

        .support {
          margin-top: 10px;

          .icon {
            display: inline-block;
            border-radius: 1px;
            width: 12px;
            height: 12px;
            background-image: url("decrease_1@2x.png");
            background-size: 12px;
          }

          .text {
            margin-left: 4px;
            font-size: 10px;
            line-height: 12px;
            vertical-align: top;
            color: #fff;
          }
        }
      }

      .support-num {
        display: inline-block;
        position: absolute;
        right: 12px;
        bottom: 18px;
        border-radius: 12px;
        padding: 7px 8px;
        background-color: rgba(0, 0, 0, .2);

        .count {
          display: inline-block;
          font-size: 10px;
          vertical-align: top;
          line-height: 12px;
          color: #fff;
        }

        .icon-keyboard_arrow_right {
          margin-left: 2px;
          font-size: 12px;
          color: #fff;
        }
      }
    }

    .bulletin {
      display: flex;
      padding: 0 12px;
      height: 28px;
      font-size: 0;
      background-color: rgba(7, 17, 27, .2);

      .icon {
        display: inline-block;
        margin-top: 8px;
        flex: 0 0 22px;
        width: 22px;
        height: 12px;
        background-image: url("bulletin@2x.png");
        background-size: 22px 12px;
      }

      .text {
        overflow: hidden;
        padding-left: 4px;
        flex: 1;
        font-size: 10px;
        line-height: 28px;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: top;
        color: #fff;
      }
    }
  }
</style>
