import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/../components/Home';
import Login from '@/../components/Login';
import Register from '@/../components/Register';
import AddressContainer from '@/../components/addresses/container';
import AddressIndex from '@/../components/addresses/index';
import AddressNew from '@/../components/addresses/new';
import AddressEdit from '@/../components/addresses/edit';
import AddressShow from '@/../components/addresses/show';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  history: true,
  saveScrollPosition: true,
  routes: [
    { path: '/', name: 'index', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    {
      path: '/addresses',
      name: 'addresses',
      component: AddressContainer,
      children: [
        { path: '/', name: 'addressnew', component: AddressIndex },
        { path: 'new', name: 'addressnew', component: AddressNew },
        { path: 'edit/:id', name: 'addressedit', component: AddressEdit },
        { path: 'show/:id', name: 'addressshow', component: AddressShow },
      ],
    },
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
