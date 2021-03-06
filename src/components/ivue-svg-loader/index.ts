import { App } from 'vue'
import IvueSvgLoader from './index.vue';

export default (app: App): void => {
  app.component(IvueSvgLoader.name, IvueSvgLoader)
}

export { IvueSvgLoader }
