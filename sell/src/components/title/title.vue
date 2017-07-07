<template>
  <div class="single-title">
    <div class="line"></div><!--使用span在某些安卓下面可能出现问题-->
    <div class="text">{{ title }}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .single-title {
    display: flex;
    margin: 28px auto 24px;
    width: 80%;

    .line {
      flex: 1;
      position: relative;
      top: -6px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
    }

    .text {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 700;
    }
  }
</style>
