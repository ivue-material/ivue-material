import { App } from 'vue'
import IvueBreadcrumbsItem from './index.vue';

export default (app: App): void => {
  app.component(IvueBreadcrumbsItem.name, IvueBreadcrumbsItem)
}

export { IvueBreadcrumbsItem }
