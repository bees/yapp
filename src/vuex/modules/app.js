import * as types from '../mutation-types'
import controls from '../../playerControls'
import Vue from 'vue'

const state = {
  current: {
    filePath: '',
    duration: 0,
    position: 0,
    playing: false,
    loaded: false,
    title: '',
    _id: ''
  },
  queue: [],
  podcastsList: [],
  episodes: [],
  loadingNewFeed: false,
  newFeedFetched: false,
  newFeedAdded: false,
  newFeedError: false,
  newFeedResult: {
    episodes: [],
    unheard: [],
    inProgress: [] //tuple, guid and timestamp
  }
}

const mutations = {
  [types.INCREMENT](state) {
    state.count++
  },
  [types.DECREMENT](state) {
    state.count--
  },
  [types.LOADINGNEWFEED](state, bool_val) {
    state.loadingNewFeed = bool_val 
  },
  [types.NEWFEEDFETCHED](state, bool_val) {
    state.newFeedFetched = bool_val 
  },
  [types.NEWFEEDRESULT](state, result) {
    state.newFeedResult = result 
  },
  [types.NEWFEEDERROR](state, bool_val) {
    //TODO add error strings
    state.newFeedERROR =  bool_val
  },
  [types.SETUNHEARD](state) {
    state.newFeedResult.unheard = state.newFeedResult.episodes.map(episode => {
      return episode.guid
    })
  },
  [types.ADDNEWFEED](state) {
    //TODO add error strings
    let {episodes, ...podcast} = state.newFeedResult
    podcast.episodes = episodes.map(ep => { return ep.guid })
    state.podcastsList.push(podcast)
    state.episodes = state.episodes.concat(...episodes)
    state.newFeedResult = {
      episodes: [],
      unheard: [],
      inProgress: []
    }
  },
  [types.DBFEEDSLOADED](state, feeds) {
    //TODO add error strings
    state.podcastsList = feeds
  },
  [types.INSTANTPLAY](state, link, guid) {
    state.current.link = link
    state.current.guid = guid
    var podcast = state.podcastsList.filter(podcast => { return podcast.link === link})[0]
    var episode = podcast.episodes.filter(episode => { return episode.guid === guid})[0]
    state.current.filePath = episode.enclosure.url
    state.current.duration = episode.duration
    state.current.title = episode.title
    state.current._id = episode._id
    state.current.playing = true
    state.current.loaded = false
    state.queue.unshift(episode)
    controls.emit('PLAYMEDIA')
  },
  [types.METADATALOADED](state, loaded, duration) {
    state.current.loaded = true
    state.current.duration = duration
  },
  [types.TIMEUPDATE](state, time) {
    state.current.position = time
  },
  [types.PLAYPAUSE](state) {
    state.current.playing = !state.current.playing
  },
  [types.ENQUEUE](state, podcast) {
    state.queue.push(podcast)
  },
}

export default {
  state,
  mutations
}
