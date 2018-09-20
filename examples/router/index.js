import Vue from 'vue';
import Router from 'vue-router';
import Affix from '../components/affix';
import Elevation from '../components/elevation';
import Layout from '../components/layout';
import Button from '../components/button';
import Icon from '../components/icon';
import IVueList from '../components/ivueList';
import IVueSpin from '../components/ivueSpin';
import IVueCarousel from '../components/ivueCarousel';
import IVueSwitch from '../components/ivueSwitch';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Affix',
      name: 'Affix',
      component: Affix
    },
    {
      path: '/Elevation',
      name: 'Elevation',
      component: Elevation
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/Button',
      name: 'Button',
      component: Button
    },
    {
      path: '/Icon',
      name: 'Icon',
      component: Icon
    },
    {
      path: '/IVueList',
      name: 'IVueList',
      component: IVueList
    },
    {
      path: '/IVueSpin',
      name: 'IVueSpin',
      component: IVueSpin
    },
    {
      path: '/IVueCarousel',
      name: 'IVueCarousel',
      component: IVueCarousel
    },
    {
      path: '/IVueSwitch',
      name: 'IVueSwitch',
      component: IVueSwitch
    }
  ]
});
