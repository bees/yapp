<template lang="pug">
</template>

<script>
  import jQuery from 'jquery'
  import semantic from '../css/dist/semantic.js'
  import { getFeedsFromDB, nukeDB } from '../vuex/actions'

  var $ = jQuery
  
  export default {
    components: {
      player
    },
    data () {
      return {
      }
    },
    vuex: {
      getters: {
        playQueue: state => state.app.playQueue,
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
@lost flexbox flex

#main
  margin-top 2rem
  lost-center 95%
  
  .playlist
    lost-column 1/4
  .podlist
    lost-column 3/4
    figure.podcasts
      flex-wrap wrap
      display inline-block
      margin 0
      margin-right 1px

i.icon.text 
  font-family "Lato", sans-serif
  font-weight bold

.ui.card > :first-child
  border-radius .28rem !important

figure figcaption,
figure figcaption > a
  position absolute
  top 0
  left 0
  width 100%
  height 100%

figure
  position relative
  float left
  overflow hidden
  //cursor pointer

figure
  &:hover
    p
      &.description
        opacity .2
      &.icon-links
        a
          &:nth-child(3)
            transition-delay 0.1s
          &:nth-child(2)
            transition-delay 0.15s
          &:first-child
            transition-delay 0.2s
  h1, h2
    font-size 1rem
    transition-delay 0.05s
    margin 0

figure:hover figcaption,
figure:hover h2,
figure:hover p.icon-links a
  transform translate3d(0,0,0)

figure figcaption 
  padding 2em
  //color #fff
  text-transform uppercase
  font-size 1.25em
  backface-visibility hidden
  top auto
  bottom 0
  padding 1em
  height 3.75em
  background #fff
  color #3c4a50
  transition transform 0.35s
  transform translate3d(0,100%,0)
  display flex
  justify-content space-between
  align-items center




</style>
