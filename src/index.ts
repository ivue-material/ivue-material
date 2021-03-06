import type { App } from 'vue'

import IvueAffix from './components/ivue-affix';
import IvueInput from './components/ivue-input';
import IvueIcon from './components/ivue-icon';
import IvueButton from './components/ivue-button';
import IvueContent from './components/ivue-content';
import IvueList from './components/ivue-list';
import IvueListItem from './components/Ivue-list-item';
import IvueCarousel from './components/ivue-carousel';
import IvueCarouselItem from './components/ivue-carousel-item';
import IvueSwitch from './components/ivue-switch';
import IvueBottomNav from './components/ivue-bottom-nav';
import IvueBottomNavItem from './components/ivue-bottom-nav-item';

// 指令
import Directives from './utils/directives/index';

export {
    IvueAffix,
    IvueInput,
    IvueIcon,
    IvueButton,
    IvueContent,
    IvueList,
    IvueListItem,
    IvueCarousel,
    IvueCarouselItem,
    IvueSwitch,
    IvueBottomNav,
    IvueBottomNavItem,
}


interface InstallOptions {

}

const install = (app: App, opt: InstallOptions): void => {
    IvueAffix(app);
    IvueInput(app);
    IvueIcon(app);
    IvueButton(app);
    IvueContent(app);
    IvueList(app);
    IvueListItem(app);
    IvueCarousel(app);
    IvueCarouselItem(app);
    IvueSwitch(app);
    IvueBottomNav(app);
    IvueBottomNavItem(app);

    // 注册全局指令
    // ripple resize touch click-outside
    Object.keys(Directives).forEach(key => {
        app.directive(key, Directives[key]);
    });
}

// auto install
/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue);
// }

const API = {
    install,
}

export default API
