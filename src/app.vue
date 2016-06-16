<template lang="pug">
.app 
  navigation
  #main
    #router
      router-view(transition-mode="out-in" transition="bounce" keep-alive)
    queue

          
</template>

<script>
import store from './vuex/store'
import navigation from './components/navigation'
import { getFeedsFromDB, nukeDB } from './vuex/actions'
import podcastItem from './components/podcastItem.vue'
import queue from './components/queue.vue'

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10) // don't forget the second param
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  var seconds = sec_num - (hours * 3600) - (minutes * 60)
  if (minutes < 10) {minutes = "0"+minutes}
  if (seconds < 10) {seconds = "0"+seconds}
  var outputStr = (hours === 0) ? 
    minutes+':'+seconds : hours+':'+minutes+':'+seconds
  return outputStr
}
 
export default {
  store,
  components: {
    navigation,
    queue
  },
  vuex: {
    actions: {
      getFeedsFromDB
    }
  },
  ready () {
    this.getFeedsFromDB()
  },
}
</script>

<style lang="stylus">
@import './css/icons.css'
@import './css/remodal.css'
@import './css/dist/semantic.css'
@import url(https://fonts.googleapis.com/css?family=Lato:400,300)
@lost flexbox flex

.remodal-overlay.remodal-is-opened
    background-color rgba(0,0,0,.85)

.remodal-is-opened, #addpodcast.ui.remodal
  transition background-color .1s linear !important

#addpodcast.ui.remodal
  top 5rem

#main
  margin-top 5rem
  lost-center 95%


  #router
    lost-column 3/4
    float left
    
  .queue
    lost-column 1/4
    position fixed
    float right

</style>
