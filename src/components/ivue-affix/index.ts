import { App } from 'vue'
import IvueAffix from './index.vue';

export default (app: App): void => {
  app.component(IvueAffix.name, IvueAffix)
}

export { IvueAffix }
