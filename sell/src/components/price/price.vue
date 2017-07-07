<template>
  <div class="price">
    <span class="now">￥{{ food.price }}</span>
    <del class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</del>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
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
</style>
