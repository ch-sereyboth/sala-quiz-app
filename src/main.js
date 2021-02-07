// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

import Vue from 'vue'
import App from './App'
import router from './router'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import { components } from 'aws-amplify-vue' 

Vue.config.productionTip = false

Amplify.configure(aws_exports)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App,
    ...components
  },
  template: '<App/>'
})