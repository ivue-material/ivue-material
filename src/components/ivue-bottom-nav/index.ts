import { App } from 'vue'
import IvueBottomNav from './index.vue';

export default (app: App): void => {
  app.component(IvueBottomNav.name, IvueBottomNav)
}

export { IvueBottomNav }
