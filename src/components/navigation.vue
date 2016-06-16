<template lang="pug">
//sadasd 
div  
  header.ui.top.menu.segment.fixed
    .ui.bottom.attached.progress.blue
      .bar(v-bind:style="{ width: percent+'%' }")
    a(v-link="{ name: 'home'}").item
      h3.brand podcasts
    .player.item
      player
    .metadata.item(v-if="current.title.length")
      p Now Playing: {{ current.title }}
    .right.menu
      a.item(data-remodal-target="demoModal")
        i.ui.add.circle.icon
        | Add new podcast
      a.item login
      #addpodcast.ui.remodal(data-remodal-id='demoModal', data-remodal-options="hashTracking: false")
        .ui.modal#hacky
          i.close.icon(data-remodal-action='close').right.floated
          .header
            | Add New Podcast
          .content
            .description
              .ui.header Podcast RSS feed:
              .ui.action.left.icon.input(v-bind:class="{'loading': loadingNewFeed}")
                i.ui.icon.feed
                input(type="text", v-model="newFeedURL", placeholder="Feed url")
                button.ui.button(@click="parseFeed(newFeedURL)") Fetch Feed

          .image.content(v-show="newFeedFetched")
            .ui.image.medium
              img(v-bind:src="newFeed.image")
            .description
              .ui.header {{ newFeed.title }}
              .meta
                p Last updated {{ newFeed.updated | moment "from" }}, {{newFeed.episodes.length}} episodes
              .ui.relaxed.list.divided
                .item(v-for="episode in episodes")
                  .content 
                    .header {{ episode.title }}
                    .description {{ Math.ceil(episode.duration / 60) }} minutes, posted on {{ episode.published | moment "calendar" }}
          
          .actions.right.floated
            .ui.black.deny.button(data-remodal-action='cancel')
              | Nevermind
            .ui.positive.right.labeled.icon.button(data-remodal-action='confirm', @click="addFeed") 
              | Add Podcast
              i.checkmark.icon
      

</template>

<script>
  import {incrementAsync, parseFeed, addFeed} from '../vuex/actions'
  import * as vs from 'vue-spectre'
  import player from './player'
  import jQuery from 'jquery'
  var $ = jQuery
  import semantic from '../css/dist/semantic.js'
  import Moment from 'moment'
  import remodal from 'remodal'

  export default {
    data () {
      return {
        newFeedURL: ''
      }
    },
    vuex: {
      getters: {
        newFeedFetched: state => state.app.newFeedFetched,
        loadingNewFeed: state => state.app.loadingNewFeed,
        newFeed: state => state.app.newFeedResult,
        current: state => state.app.current,
      },
      actions: {
        incrementAsync,
        parseFeed,
        addFeed
      }
    },
    components: {
      player
    },
    computed: {
      episodes: function () {
        return this.newFeed.episodes.slice(0, Math.min(5, this.newFeed.episodes.length))
      },
      percent: function () {
        var percent = (this.current.position/this.current.duration)*100
        return Number.isNaN(percent) ? 0 : percent
      },
    },
    methods: {
      showModal: function () {
      $('#addpodcast')
        .modal('show')
      }
    },
    ready () {
    }
  }
</script>

<style lang="stylus">
header.ui.top.attached.menu
  lost-center 95%

h3.brand
  font-family 'Lato', sans-serif
  font-weight 300

.ui.action.left.icon.input
  width 100%

#addpodcast.ui.remodal
  display inline-block !important
  top 2rem

#hacky.ui.modal
  top 4rem
  display inline-block !important

.ui.bottom.attached.progress
  .bar
    min-width 0

.brand a
  color #333
</style>
