import Vue from 'vue';
import Router from 'vue-router';
import ChatWindow from '../components/ChatWindow';
import ChatLogin from '../components/ChatLogin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/chat',
      name: 'ChatWindow',
      component: ChatWindow
    },
    {
      path: '/',
      name: 'ChatLogin',
      component: ChatLogin
    }
  ]
});
