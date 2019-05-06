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
import TherapyContainer from '@/../components/therapies/container';
import TherapyIndex from '@/../components/therapies/index';
import TherapyNew from '@/../components/therapies/new';
import TherapyEdit from '@/../components/therapies/edit';
import TherapyShow from '@/../components/therapies/show';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  history: true,
  saveScrollPosition: true,
  routes: [
    { path: '/', name: 'index', component: Home },
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    {
      path: '/addresses',
      component: AddressContainer,
      children: [
        { path: '/', name: 'addresses', component: AddressIndex },
        { path: 'new', name: 'addressnew', component: AddressNew },
        { path: 'edit/:id', name: 'addressedit', component: AddressEdit },
        { path: 'show/:id', name: 'addressshow', component: AddressShow },
      ],
    },
    {
      path: '/therapies',
      component: TherapyContainer,
      children: [
        { path: '/', name: 'therapies', component: TherapyIndex },
        { path: 'new', name: 'therapynew', component: TherapyNew },
        { path: 'edit/:id', name: 'therapyedit', component: TherapyEdit },
        { path: 'show/:id', name: 'therapyshow', component: TherapyShow },
      ],
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.name === 'login' || to.name === 'register') {
    return next();
  }

  if (!window.localStorage.getItem('psy-jwt-token')) {
    console.log('Router::login required');
    return next({ name: 'login' });
  }

  next();
});

export default router;
