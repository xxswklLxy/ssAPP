import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import drawer from './components/drawer/drawer.vue'

Vue.component('drawer',drawer)

const app = new Vue({
    ...App
})
app.$mount()
