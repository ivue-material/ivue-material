import IvueAffix from './components/IvueAffix';
import IvueElevation from './components/IvueElevation';
import IvueContent from './components/IvueContent';
// import IvueLayout from './components/IvueLayout';
import IvueButton from './components/IvueButton';
import IvueIcon from './components/IvueIcon';
import IvueList from './components/IvueList';
import IvueListItem from './components/IvueListItem';
import IvueSpin from './components/IvueSpin';
import IvueCarousel from './components/IvueCarousel';
import IvueCarouselItem from './components/IvueCarouselItem';
import IvueSwitch from './components/IvueSwitch';
import IvueBottomNav from './components/IvueBottomNav';
import IvueBreadcrumbs from './components/IvueBreadcrumbs';
import IvueBreadcrumbsItem from './components/IvueBreadcrumbsItem';
import { IvueSelect, IvueOption, IvueOptionGroup } from './components/IvueSelect';
import IvueAutoComplete from './components/IvueAutoComplete';
import IvueInput from './components/IvueInput';
import { IvueStepper, IvueStepperStep } from './components/IvueStepper';
import IvueUpLoad from './components/IvueUpLoad';
import { IvueProgressLinear, IvueProgressCircular } from './components/IvueProgress';
import IvueNotice from './components/IvueNotice';
import IvueMessage from './components/IvueMessage';
import { IvueTabs, IvueTab, IvueTabItem,IvueTabsSlider } from './components/IvueTabs';
import IvueLoadingBar from './components/IvueLoadingBar';
import IvueBadge from './components/IvueBadge';
import IvueDatePicker from './components/IvueDatePicker';

const components = {
  IvueAffix,
  IvueElevation,
  IvueContent,
  // IvueLayout,
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
