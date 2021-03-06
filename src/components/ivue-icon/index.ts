import { App } from 'vue'
import IvueIcon from './index.vue';

export default (app: App): void => {
  app.component(IvueIcon.name, IvueIcon)
}

export { IvueIcon }
