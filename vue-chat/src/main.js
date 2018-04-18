// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { UserService } from './service/UserService';

Vue.config.productionTip = false;

UserService.authenticate('Alexander', 'alex').then(() => {
  console.log('Authenticated');
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  });
}).catch(() => {
  console.log('Not authenticated');
});
