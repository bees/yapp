<template lang="pug">
.ui.container
  .ui.container(v-if="podcast", v-bind:style="{background: hc}")
    .ui.items
      .item
        .ui.small.image
          img(v-el:image, v-bind:src="podcast.image")
        .content
          h1.header {{ podcast.title }}
          .meta
            span
              | Last updated {{ podcast.updated | moment "from"}}
          .description
            p(v-if="podcast.description.long") {{ podcast.description.long }}
            p(v-else) {{ podcast.description.short }}
          .stats.extra
            .ui.statistic.mini
              .value
                | {{ episodesList.length }}
              .label
                | Episodes
            .ui.statistic.mini
              .value
                | {{ podcast.unheard.length }}
              .label
                | Unheard
    
              
    .ui.container.inverted#episode-list
      .ui.relaxed.divided.list.inverted
        .item(v-for="episode in podEps")
          .right.floated.content.controls
            button.ui.circular.icon.button.blue(@click="$store.dispatch('ENQUEUE', episode)").tiny
              i.icon.plus
            button.ui.circular.icon.button.green(@click="$store.dispatch('INSTANTPLAY', episode.guid)").tiny
              i.icon.play
          .content
            .header
              | {{ episode.title }}
            .description
              | {{ episode.duration.toString().toHHMMSS()  }} | Posted {{ episode.published | moment "from" }}
    
</template>

<script>
import Vibrant from 'node-vibrant'

export default {
  components: {
  },
  data () {
    return {
    }
  },
  vuex: {
    getters: {
      podcastsList: state => state.app.podcastsList,
      episodesList: state => state.app.episodes,
      current: state => state.app.current,
    },
  },
  computed: {
    podcast: function () {
      var podcastName = this.$route.params.podcast
      return this.podcastsList.filter(podcast => {
        return podcast.title === podcastName
      })[0]
    },
    podEps: function () {
      return this.episodesList.filter(ep => { return this.podcast.episodes.indexOf(ep.guid) > -1 } )
    },
    hc: function () {
      var color = "#fff"
      var src = this.$els.image.getAttribute('src')
      if (src) {
        console.log(src)
        var img = new Image()
        img.src = src + '?' + new Date().getTime()
        img.setAttribute('crossorigin', '')
        console.log(img)
        Vibrant.from(img).getPalette((err, palette) => {
          console.log(err)
          color = palette[0].getHex()
        })
        var vm = this
      }
      return color
    }
  },
}
</script>

<style lang="stylus" scoped>
@lost flexbox flex


#episode-list
  width 100%

  &.ui.container.inverted
    background-color #1b1c1d
    color rgba(255, 255, 255, .7)
  .item
    padding .5rem 1rem
    .controls 
      visibility hidden
      button 
        margin 0 0 0 1rem 
        i
          color #fff
    &:hover
      background-color rgba(255,255,255,.1)
      .controls > button
        visibility visible 

    
</style>
