import { App } from 'vue'
import IvueSwitch from './index.vue';

export default (app: App): void => {
  app.component(IvueSwitch.name, IvueSwitch)
}

export { IvueSwitch }
