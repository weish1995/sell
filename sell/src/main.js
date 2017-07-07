import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';
import 'common/styles/index.less';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {path: '/goods', component: goods},
  {path: '/seller', component: seller},
  {path: '/ratings', component: ratings}
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

router.push('/goods');
