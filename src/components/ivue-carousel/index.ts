import { App } from 'vue'
import IvueCarousel from './index.vue';

export default (app: App): void => {
  app.component(IvueCarousel.name, IvueCarousel)
}

export { IvueCarousel }
