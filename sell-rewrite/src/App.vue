<template>
  <div class="app">
    <v-header :seller="seller"></v-header>
    <ul class="navbar">
      <li class="navbar-item">
        <router-link to="/goods">商品</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/ratings">评价</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/seller">商家</router-link>
      </li>
    </ul>
    <transition name="cont">
      <keep-alive>
        <router-view class="content" :seller="seller"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header';

  const ERR_NO = 0;

  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      };
    },
    components: {
      'v-header': header
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_NO) {
          this.seller = response.data;
        }
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "commons/style/base";
  @import "commons/style/icon";

  .app {
    .navbar {
      display: flex;
      .border-bottom-1px(rgba(7, 17, 27, .1));

      .navbar-item {
        flex: 1;
        a {
          display: block;
          width: 100%;
          height: 40px;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          color: rgb(77, 85, 93);

          &.active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }

    & > .content {
      min-width: 320px;
      opacity: 1;
      transition: all .4s;

      &.cont-enter,
      &.cont-leave-to {
        opacity: 0;
      }
    }
  }
</style>
