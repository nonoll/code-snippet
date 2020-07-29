import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { IntersectionObserver } from '@nonoll/code-snippet/observer'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const observer = new IntersectionObserver({ target: document.querySelector('body') as HTMLElement })
observer.attach()
console.log('observer', observer)
