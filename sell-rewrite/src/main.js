import Vue from 'vue';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {path: '/seller', component: seller},
  {path: '/ratings', component: ratings},
  {path: '/goods', component: goods}
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

router.push('/goods');
