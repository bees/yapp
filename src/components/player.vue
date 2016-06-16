<template lang="pug">
.player
  audio(v-bind:src="current.filePath",
        v-el:audio-el,
        v-on:timeupdate="timeUpdate | debounce 200",
        v-on:loadedmetadata="metadataLoaded")#audiop
  .controls(v-bind:class="{ 'clickable': current.loaded }")
    i(@click="seek(-10)").icon-fast-backward
    i(@click="playPause").icon-play.play-pause
    i(@click="seek(30)").icon-fast-forward
  //.ui.tiny.progress.media-bar
  //  .bar(v-bind:style="{ width: percent+'%' }")
  p.timestamp {{ time }}/{{ duration }}
</template>

<script>
  import controls from '../playerControls'
  import {updateProgress} from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        current: state => state.app.current
      },
      actions: {
        updateProgress 
      }
    },
    computed: {
      percent: function () {
        var percent = (this.current.position/this.current.duration)*100
        return Number.isNaN(percent) ? 0 : percent
      },
      time: function () {
        var integer = Math.floor(this.current.position)
        return integer.toString().toHHMMSS()
      },
      duration: function () {
        var integer = Math.floor(this.current.duration)
        return integer.toString().toHHMMSS()
      }
    },
    methods: {
      timeUpdate: function () {
        this.updateProgress(this.$els.audioEl.currentTime)
      },
      metadataLoaded: function () {
        this.$store.dispatch('METADATALOADED', 
          true,
          this.$els.audioEl.duration)
      },
      playPause: function () {
        //this is wrong:
        if (this.current.playing) {
          this.$els.audioEl.pause()
        } else {
          this.$els.audioEl.play()
        }
        this.$store.dispatch('PLAYPAUSE')
      },
      play: function () {
        var vm = this
        var once = true
        var waitForLoad = function (e) {
          
          if (!vm.current.loaded) {
            window.setTimeout(waitForLoad, 500) 
          } else {
            vm.$els.audioEl.play()
          }
        }
        waitForLoad()
      },
      seek: function (delta) {
      if (delta >= 0) {
        this.current.position = 
          delta + this.current.position < this.current.duration ? 
          delta + this.current.position : this.current.duration
        this.$els.audioEl.currentTime = this.current.position
      } else {
        this.current.position = 
          delta + this.current.position > 0  ? 
          delta + this.current.position : 0
        this.$els.audioEl.currentTime = this.current.position
      }

      }
    },
    created () {
      controls.on('PLAYMEDIA', this.play)
    },
    destroyed () {
      controls.removeListener('PLAYMEDIA', this.play)
    }
  }
</script>

<style lang="stylus">
.player
  display flex
  align-items center
  justify-content space-between
.ui.media-bar.tiny.progress
  width 200px
  margin 0
  .bar
    min-width 0

.timestamp
  padding 0 0 0 1em

.controls
  display flex
  align-items center
  margin 0 1rem
  i
    color #999
  &.clickable
    i
      color #000
      cursor pointer
  .play-pause::before
    font-size 2rem !important

.ui.segment
  padding 0
</style>
