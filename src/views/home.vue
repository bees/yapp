<template lang="pug">
.podlist
  //a(@click="getFeedsFromDB").ui.button.blue test
  //a(@click="nukeDB").ui.button.red  nuke
  p {{ podcastslist }}
  podcast-item(v-for="podcast in podcastsList", v-bind:podcast="podcast")

</template>

<script>
  import Player from '../components/player.vue'
  import podcastItem from '../components/podcastItem.vue'
  import jQuery from 'jquery'
  import semantic from '../css/dist/semantic.js'
  import { getFeedsFromDB, nukeDB } from '../vuex/actions'

  var $ = jQuery
  
  export default {
    components: {
      Player,
      podcastItem
    },
    data () {
      return {
      }
    },
    vuex: {
      getters: {
        podcastsList: state => state.app.podcastsList
      },
      actions: {
        getFeedsFromDB,
        nukeDB
      }
    },
    ready () {
    }
  }
</script>

<style lang="stylus" scoped>
</style>
