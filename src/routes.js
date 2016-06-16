export default {
  '/': {
    component: require('./views/home'),
    name: 'home'
  },
  '/podcast/:podcast': {
    component: require('./views/podcastDetails'),
    name: 'podcast'
  }
}
