import { App } from 'vue'
import IvueList from './index.vue';

export default (app: App): void => {
    app.component(IvueList.name, IvueList)
}

export { IvueList }
