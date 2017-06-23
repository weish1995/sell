<template>
  <div>
    <v-header :seller="seller"></v-header>
    <ul class="tab border-1px">
      <li class="tab-item">
        <router-link to="/goods">商品</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/seller">商家</router-link>
      </li>
    </ul>
    <router-view :seller="seller">
    </router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "./common/styles/mixin";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    .border-1px(rgb(7, 17, 27, 0.1));
  }

  .tab-item {
    flex: 1;

    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);

      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
</style>
