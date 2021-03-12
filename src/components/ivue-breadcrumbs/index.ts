import { App } from 'vue'
import IvueBreadcrumbs from './index.vue';

export default (app: App): void => {
  app.component(IvueBreadcrumbs.name, IvueBreadcrumbs)
}

export { IvueBreadcrumbs }
