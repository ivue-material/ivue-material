import IVueAffix from './components/IVueAffix';
import IVueElevation from './components/IVueElevation';
import IVueContent from './components/IVueContent';
import IVueLayout from './components/IVueLayout';
import IVueButton from './components/IVueButton';
import IVueIcon from './components/IVueIcon';
import IVueList from './components/IVueList';
import IVueListItem from './components/IVueListItem';

const components = {
  IVueAffix,
  IVueElevation,
  IVueContent,
  IVueLayout,
  IVueButton,
  IVueIcon,
  IVueList,
  IVueListItem
};

const iVue = {
  ...components
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;

  Object.keys(iVue).forEach(key => {
    Vue.component(key, iVue[key]);
  });
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
