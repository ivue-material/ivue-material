import IVueAffix from './components/IVueAffix';
import IVueElevation from './components/IVueElevation';
import IVueContent from './components/IVueContent';
import IVueLayout from './components/IVueLayout';
import IVueButton from './components/IVueButton';
import IVueIcon from './components/IVueIcon';
import IVueList from './components/IVueList';
import IVueListItem from './components/IVueListItem';
import IVueSpin from './components/IVueSpin';
import IVueCarousel from './components/IVueCarousel';
import IVueCarouselItem from './components/IVueCarouselItem';
import IVueSwitch from './components/IVueSwitch';
import IVueBottomNav from './components/IVueBottomNav';
import IVueBreadcrumbs from './components/IVueBreadcrumbs';
import IVueBreadcrumbsItem from './components/IVueBreadcrumbsItem';
import { IVueSelect, IVueOption, IVueOptionGroup } from './components/IVueSelect';
import IVueAutoComplete from './components/IVueAutoComplete';
import IVueInput from './components/IVueInput';
import { IVueStepper, IVueStepperStep } from './components/IVueStepper';
import IVueUpLoad from './components/IVueUpLoad';
import { IVueProgressLinear, IVueProgressCircular } from './components/IVueProgress';
import IVueNotice from './components/IVueNotice';
import IVueMessage from './components/IVueMessage';
import { IVueTabs, IVueTab, IVueTabItem,IVueTabsSlider } from './components/IVueTabs';

const components = {
  IVueAffix,
  IVueElevation,
  IVueContent,
  IVueLayout,
  IVueButton,
  IVueIcon,
  IVueList,
  IVueListItem,
  IVueSpin,
  IVueCarousel,
  IVueCarouselItem,
  IVueSwitch,
  IVueBottomNav,
  IVueBreadcrumbs,
  IVueBreadcrumbsItem,
  IVueSelect,
  IVueOption,
  IVueOptionGroup,
  IVueAutoComplete,
  IVueInput,
  IVueStepper,
  IVueStepperStep,
  IVueUpLoad,
  IVueProgressLinear,
  IVueProgressCircular,
  IVueNotice,
  IVueMessage,
  IVueTabs,
  IVueTab,
  IVueTabItem,
  IVueTabsSlider
};

const iVue = {
  ...components
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;

  Object.keys(iVue).forEach(key => {
    Vue.component(key, iVue[key]);
  });

  // 获取组件参数
  Vue.prototype.$IVUE = {
    size: opts.size || '',
    transfer: 'transfer' in opts ? opts.transfer : ''
  };

  // 注册全局 IVueSpin 组件
  Vue.prototype.$IVueSpin = IVueSpin;

  // 注册全局 IVueNotice 通知 组件
  Vue.prototype.$IVueNotice = IVueNotice;

  // 注册全局 IVueMessage 提示 组件
  Vue.prototype.$IVueMessage = IVueMessage;

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
