<template>
  <div class="split"></div>
</template>

<script type="text/ecmascript-6">
  export default{};
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../commons/style/base';

  .split {
    .border-bottom-1px(rgba(7, 17, 27, .1));
    width: 100%;
    height: 16px;
    background-color: #f3f5f7;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      border-top: 1px solid rgba(7, 17, 27, .1);
      width: 100%;
      transform: scaleY(.5);
      content: '';
    }
  }
</style>
