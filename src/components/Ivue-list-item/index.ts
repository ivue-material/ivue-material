import { App } from 'vue'
import IvueListItem from './index.vue';

export default (app: App): void => {
    app.component(IvueListItem.name, IvueListItem)
}

export { IvueListItem }
