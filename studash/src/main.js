// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import DashHome from './components/DashHome'
import UserDetails from './components/UserDetails'

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: DashHome
  },
  {
    path: '/userdetails/:id',
    name: 'UserDetails',
    component: UserDetails
  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})