<template>
  <div class="info-title">
    <div class="line"></div>
    <div class="text">{{ text }}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      text: String
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .info-title {
    display: flex;
    margin: 28px 0 24px;

    .line {
      position: relative;
      top: -6px;
      flex: 1;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
    }

    .text {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
    }
  }
</style>
