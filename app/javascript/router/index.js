import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/../components/Home';
import Login from '@/../components/Login';
import Register from '@/../components/Register';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  history: true,
  saveScrollPosition: true,
  routes: [
    { path: '/', name: 'index', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.name === 'login' || to.name === 'register') {
    return next();
  }

  if (!window.localStorage.getItem('jwt-token')) {
    console.log('Router::login required');
    return next({ name: 'login' });
  }

  next();
});

export default router;
