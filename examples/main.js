import {
    createApp
} from 'vue'
import App from './App'
import router from './router'
import IVue from '../src/index'
// import IVue from '../dist/ivue';

import "../src/styles/index.scss";
import "../src/styles/theme/index.scss";
import "../src/components/ivue-elevation/index";
import "../src/components/ivue-layout/index";

const app = createApp(App)
app.use(router)
app.use(IVue)

app.mount('#app')
