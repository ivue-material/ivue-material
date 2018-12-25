import IvueAffix from './components/ivue-affix';
import IvueContent from './components/ivue-content';
import IvueButton from './components/ivue-button';
import IvueIcon from './components/ivue-icon';
import IvueList from './components/ivue-list';
import IvueListItem from './components/ivue-list-item';
import IvueSpin from './components/ivue-spin';
import IvueCarousel from './components/ivue-carousel';
import IvueCarouselItem from './components/ivue-carousel-item';
import IvueSwitch from './components/ivue-switch';
import IvueBottomNav from './components/ivue-bottom-nav';
import IvueBreadcrumbs from './components/ivue-breadcrumbs';
import IvueBreadcrumbsItem from './components/ivue-breadcrumbs-item';
import { IvueSelect, IvueOption, IvueOptionGroup } from './components/ivue-select';
import IvueAutoComplete from './components/ivue-auto-complete';
import IvueInput from './components/ivue-input';
import { IvueStepper, IvueStepperStep } from './components/ivue-stepper';
import IvueUpLoad from './components/ivue-up-load';
import { IvueProgressLinear, IvueProgressCircular } from './components/ivue-progress';
import IvueNotice from './components/ivue-notice';
import IvueMessage from './components/ivue-message';
import { IvueTabs, IvueTab, IvueTabItem, IvueTabsSlider } from './components/ivue-tabs';
import IvueLoadingBar from './components/ivue-loading-bar';
import IvueBadge from './components/ivue-badge';
import IvueDatePicker from './components/ivue-date-picker';

const components = {
  IvueAffix,
  IvueContent,
  IvueButton,
  IvueIcon,
  IvueList,
  IvueListItem,
  IvueSpin,
  IvueCarousel,
  IvueCarouselItem,
  IvueSwitch,
  IvueBottomNav,
  IvueBreadcrumbs,
  IvueBreadcrumbsItem,
  IvueSelect,
  IvueOption,
  IvueOptionGroup,
  IvueAutoComplete,
  IvueInput,
  IvueStepper,
  IvueStepperStep,
  IvueUpLoad,
  IvueProgressLinear,
  IvueProgressCircular,
  IvueNotice,
  IvueMessage,
  IvueTabs,
  IvueTab,
  IvueTabItem,
  IvueTabsSlider,
  IvueLoadingBar,
  IvueBadge,
  IvueDatePicker
};

const iVue = {
  ...components
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;

  Object.keys(iVue).forEach(key => {
    Vue.component(key, iVue[key]);
  });

  // 注册全局 IvueSpin 组件
  Vue.prototype.$IvueSpin = IvueSpin;

  // 注册全局 IvueNotice 通知 组件
  Vue.prototype.$IvueNotice = IvueNotice;

  // 注册全局 IvueMessage 提示 组件
  Vue.prototype.$IvueMessage = IvueMessage;

  // 注册全局 IvueLoadingBar 滚动条加载 组件
  Vue.prototype.$IvueLoadingBar = IvueLoadingBar;

  Vue.prototype.$Ivue = {
    size: opts.size || '',
    transfer: 'transfer' in opts ? opts.transfer : '',
    breakpointWidth: 800
  }

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  install,
  ...components
};

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
