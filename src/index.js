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
  IVueInput
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

  // 注册全局 ivueSpin 组件
  Vue.prototype.$IVueSpin = IVueSpin;

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
