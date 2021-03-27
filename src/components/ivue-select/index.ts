import { App } from 'vue'
import IvueSelect from './ivue-select.vue';
import IvueOption from './ivue-option.vue';
import IvueOptionGroup from './ivue-option-group.vue';

export default (app: App): void => {
    app.component(IvueSelect.name, IvueSelect)
    app.component(IvueOption.name, IvueOption)
    app.component(IvueOptionGroup.name, IvueOptionGroup)
}

export { IvueSelect, IvueOption, IvueOptionGroup }
