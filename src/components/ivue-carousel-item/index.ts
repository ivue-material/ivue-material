import { App } from 'vue'
import IvueCarouselItem from './index.vue';

export default (app: App): void => {
  app.component(IvueCarouselItem.name, IvueCarouselItem)
}

export { IvueCarouselItem }
