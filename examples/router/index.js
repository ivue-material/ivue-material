import Vue from 'vue';
import Router from 'vue-router';
import Affix from '../components/affix';
import Elevation from '../components/elevation';
import Layout from '../components/layout';
import Button from '../components/button';
import Icon from '../components/icon';
import IvueList from '../components/ivueList';
import IvueSpin from '../components/ivueSpin';
import IvueCarousel from '../components/ivueCarousel';
import IvueSwitch from '../components/ivueSwitch';
import IvueBottomNav from '../components/ivueBottomNav';
import IvueBreadcrumbs from '../components/ivueBreadcrumb';
import IvueSelect from '../components/ivueSelect';
import IvueAutoComplete from '../components/ivueAutoComplete';
import IvueInput from '../components/ivueInput';
import IvueStepperStep from '../components/ivueStepperStep';
import IvueUpLoad from '../components/ivueUpLoad';
import IvueProgress from '../components/ivueProgress';
import IvueNotice from '../components/ivueNotice';
import IvueMessage from '../components/ivueMessage';
import IvueTabs from '../components/ivueTabs';
import IvueLoadingBar from '../components/iVueLoadingBar';
import IvueBadge from '../components/ivueBadge';
import IvueDatePicker from '../components/ivueDatePicker';
import IvueVirtualCollection from '../components/ivueVirtualCollection';
import IvueCollapse from '../components/ivueCollapse';
import IvueCascader from '../components/IvueCascader';
import IvueTooltip from '../components/ivueTooltip';


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
      path: '/IvueList',
      name: 'IvueList',
      component: IvueList
    },
    {
      path: '/IvueSpin',
      name: 'IvueSpin',
      component: IvueSpin
    },
    {
      path: '/IvueCarousel',
      name: 'IvueCarousel',
      component: IvueCarousel
    },
    {
      path: '/IvueSwitch',
      name: 'IvueSwitch',
      component: IvueSwitch
    },
    {
      path: '/IvueBottomNav',
      name: 'IvueBottomNav',
      component: IvueBottomNav
    },
    {
      path: '/IvueBreadcrumbs',
      name: 'IvueBreadcrumbs',
      component: IvueBreadcrumbs
    },
    {
      path: '/IvueSelect',
      name: 'IvueSelect',
      component: IvueSelect
    },
    {
      path: '/IvueAutoComplete',
      name: 'IvueAutoComplete',
      component: IvueAutoComplete
    },
    {
      path: '/IvueInput',
      name: 'IvueInput',
      component: IvueInput
    },
    {
      path: '/IvueStepperStep',
      name: 'IvueStepperStep',
      component: IvueStepperStep
    },
    {
      path: '/IvueUpLoad',
      name: 'IvueUpLoad',
      component: IvueUpLoad
    },
    {
      path: '/IvueProgress',
      name: 'IvueProgress',
      component: IvueProgress
    },
    {
      path: '/IvueNotice',
      name: 'IvueNotice',
      component: IvueNotice
    },
    {
      path: '/IvueMessage',
      name: 'IvueMessage',
      component: IvueMessage
    },
    {
      path: '/IvueTabs',
      name: 'IvueTabs',
      component: IvueTabs
    },
    {
      path: '/IvueLoadingBar',
      name: 'IvueLoadingBar',
      component: IvueLoadingBar
    },
    {
      path: '/IvueBadge',
      name: 'IvueBadge',
      component: IvueBadge
    },
    {
      path: '/IvueDatePicker',
      name: 'IvueDatePicker',
      component: IvueDatePicker
    },
    {
      path: '/IvueVirtualCollection',
      name: 'IvueVirtualCollection',
      component: IvueVirtualCollection
    },
    {
      path: '/IvueCollapse',
      name: 'IvueCollapse',
      component: IvueCollapse
    },
    {
        path: '/IvueCascader',
        name: 'IvueCascader',
        component: IvueCascader
    },
    {
        path: '/IvueTooltip',
        name: 'IvueTooltip',
        component: IvueTooltip
    }
  ]
});
