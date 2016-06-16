<template lang="pug">
.queue
  h3 Queue
  div(v-dragula="colOne" bag="queue").ui.divided.list.relaxed.sortable
    div(v-for="podcast in queue", v-if="queue" v-bind:data-ep="podcast.guid").item.sortable-item
      .content
        p.header {{ podcast.title }} 
        p.meta
          | {{ podcast.duration.toString().toHHMMSS() }}
    div.item(v-if="queue.length === 0").queue-item
      .content
        p.header Your queue is empty, add something!
  
</template>

<script>
import Vue from 'vue'

export default {
  vuex: {
    getters: {
      queue: state => state.app.queue
    }
  },
  ready: function () {
    Vue.vueDragula.eventBus.$on('drop', function (args) {
    console.log(args[2].children)
    //TODO: update queue mutation
    })
  },
  created: function () {
    Vue.vueDragula.options('queue', {
      direction: 'vertical'
    })
  }
}
</script>

<style lang="stylus" scoped>
.item 
  width 100%

.gu-mirror
  position fixed !important
  margin 0 !important
  z-index 9999 !important
  opacity 0.8
  filter opacity(80%)


.gu-hide 
  display none !important

.gu-unselectable
  -webkit-user-select none !important
  -moz-user-select none !important
  -ms-user-select none !important
  user-select none !important

.gu-transit
  opacity 0.2
  filter opacity(60%)

</style>
