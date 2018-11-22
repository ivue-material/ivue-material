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
import IVueBottomNav from '../components/ivueBottomNav';
import IVueBreadcrumbs from '../components/ivueBreadcrumb';
import IVueSelect from '../components/ivueSelect';
import IVueAutoComplete from '../components/ivueAutoComplete';
import IVueInput from '../components/ivueInput';
import IVueStepperStep from '../components/ivueStepperStep';
import IVueUpLoad from '../components/ivueUpLoad';
import IVueProgress from '../components/ivueProgress';
import IVueNotice from '../components/ivueNotice';
import IVueMessage from '../components/ivueMessage';
import IVueTabs from '../components/ivueTabs';
import IVueLoadingBar from '../components/iVueLoadingBar';
import IVueBadge from '../components/ivueBadge';
import IVueDatePicker from '../components/ivueDatePicker';

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
    },
    {
      path: '/IVueBottomNav',
      name: 'IVueBottomNav',
      component: IVueBottomNav
    },
    {
      path: '/IVueBreadcrumbs',
      name: 'IVueBreadcrumbs',
      component: IVueBreadcrumbs
    },
    {
      path: '/IVueSelect',
      name: 'IVueSelect',
      component: IVueSelect
    },
    {
      path: '/IVueAutoComplete',
      name: 'IVueAutoComplete',
      component: IVueAutoComplete
    },
    {
      path: '/IVueInput',
      name: 'IVueInput',
      component: IVueInput
    },
    {
      path: '/IVueStepperStep',
      name: 'IVueStepperStep',
      component: IVueStepperStep
    },
    {
      path: '/IVueUpLoad',
      name: 'IVueUpLoad',
      component: IVueUpLoad
    },
    {
      path: '/IVueProgress',
      name: 'IVueProgress',
      component: IVueProgress
    },
    {
      path: '/IVueNotice',
      name: 'IVueNotice',
      component: IVueNotice
    },
    {
      path: '/IVueMessage',
      name: 'IVueMessage',
      component: IVueMessage
    },
    {
      path: '/IVueTabs',
      name: 'IVueTabs',
      component: IVueTabs
    },
    {
      path: '/IVueLoadingBar',
      name: 'IVueLoadingBar',
      component: IVueLoadingBar
    },
    {
      path: '/IVueBadge',
      name: 'IVueBadge',
      component: IVueBadge
    },
    {
      path: '/IVueDatePicker',
      name: 'IVueDatePicker',
      component: IVueDatePicker
    }
  ]
});
