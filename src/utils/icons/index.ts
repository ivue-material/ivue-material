import { App } from 'vue'
import IvueArrowDownIcon from './ivue-arrow-down-icon.vue';

export default (app: App): void => {
  app.component(IvueArrowDownIcon.name, IvueArrowDownIcon)
}

export { IvueArrowDownIcon }
