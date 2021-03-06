import { App } from 'vue'
import IvueInput from './index.vue';

export default (app: App): void => {
  app.component(IvueInput.name, IvueInput)
}

export { IvueInput }
