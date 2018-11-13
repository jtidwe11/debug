import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

let app = document.createElement('div')
app.id = 'app'
document.body.appendChild(app)

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
