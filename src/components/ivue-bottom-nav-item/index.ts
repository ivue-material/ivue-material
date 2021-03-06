import { App } from 'vue'
import IvueBottomNavItem from './index.vue';

export default (app: App): void => {
  app.component(IvueBottomNavItem.name, IvueBottomNavItem)
}

export { IvueBottomNavItem }
