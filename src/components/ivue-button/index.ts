import { App } from 'vue'
import IvueButton from './index.vue';

export default (app: App): void => {
  app.component(IvueButton.name, IvueButton)
}

export { IvueButton }
