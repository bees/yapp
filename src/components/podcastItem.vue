<template lang="pug">
.wrap
  figure.podcast 
    //.ui.floating.red.label 30
    .ui.image.fluid
      .ui.right.corner.label.red
        i.icon.text {{ podcast.unheard.length }}
      a(v-link="{ name: 'podcast', params: {podcast: podcast.title}}")
        img(v-bind:src="podcast.image")
    figcaption
      h1 {{ podcast.title }}
      .controls
        a(@click="quickPlay(podcast)").icon-play
                
</template>

<script>

export default {
  props: ['podcast'],
  methods: {
    quickPlay: function (podcast) {
      var guid = podcast.unheard.length ? podcast.unheard[podcast.unheard.length-1] : podcast.episodes[podcast.episodes.length-1] //make better default behavior
      this.$store.dispatch('INSTANTPLAY', podcast.link, guid)
    }
  }
}
</script>

<style lang="stylus" scoped>
@lost flexbox flex


for i in 2..6
  @media (min-width: 2**(i+6)px)
    .podcast
      lost-waffle 1/i 0 0 flex


i.icon.text 
  font-family "lato", sans-serif
  font-weight bold

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
  margin 0

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

.controls a
  color black
  cursor pointer



</style>
