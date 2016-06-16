/* global __DEV__ */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VuePaginate from 'vue-paginate'
import app from './app'
import routes from './routes'
import Sortable from 'vue-sortable'
import VueMoment from 'vue-moment'
import VueDragula from 'vue-dragula'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueMoment)
Vue.use(VueDragula)
Vue.use(Sortable)
Vue.config.debug = true

Vue.http.options.crossOrigin = null

Vue.transition('bounce', {
    enterClass: 'fadeInRight',
    leaveClass: 'fadeOutRight'
})

if (__DEV__) {
  window.VueDev = Vue
}

const router = new VueRouter()
router.map(routes)
router.start(app, '#app')
