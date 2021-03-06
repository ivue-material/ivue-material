import { App } from 'vue'
import IvueContent from './index.vue';

export default (app: App): void => {
  app.component(IvueContent.name, IvueContent)
}

export { IvueContent }
