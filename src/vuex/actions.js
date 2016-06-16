import * as types from './mutation-types'
import parsePodcast from 'node-podcast-parser'
//import request from 'request'
import Vue from 'vue'
import pouch from 'pouchdb'

const db = new pouch('podcasts')
const remoteCouch = false

export default window.PouchDB = db

export const parseFeed = ({dispatch}, url) => {
  dispatch(types.LOADINGNEWFEED, true)
  Vue.http.get(url).then(response => {
    console.log(response)
    if (!response.ok) {
      console.log('problem with request, TODO flash message to user')
    }
    parsePodcast(response.data, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // data looks like the format above 
        dispatch(types.NEWFEEDRESULT, data)
        dispatch(types.NEWFEEDFETCHED, true)
      }
      dispatch(types.LOADINGNEWFEED, false)
    })
  }, response => {
    Vue.http.get('https://crossorigin.me/' + url).then(response => {
      console.log(response)
      if (!response.ok) {
        console.log('problem with request, TODO flash message to user')
      }
      parsePodcast(response.data, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          // data looks like the format above 
          dispatch(types.NEWFEEDRESULT, data)
          dispatch(types.NEWFEEDFETCHED, true)
        }
        dispatch(types.LOADINGNEWFEED, false)
      })
    }, response => {
        dispatch(types.LOADINGNEWFEED, false)
    })
  })
}

export const addFeed = ({dispatch, state}) => {
  //this is probably wrong
  dispatch(types.SETUNHEARD)
  var newFeedObject = state.app.newFeedResult
  db.put(newFeedObject, newFeedObject.link).then(response => {
    dispatch(types.ADDNEWFEED)
  }).catch(err => {
    console.log(err)
  })
}

export const updateProgress = ({dispatch, state}, time) => {
  dispatch(types.TIMEUPDATE, time)
//state.current
//db.put(
//    db.get('mydoc').then(function(doc) {
//      return db.put({
//        _id: 'mydoc',
//        _rev: doc._rev,
//        title: "Let's Dance"
//      })
//    }).then(function(response) {
//    }).catch(function (err) {
//      console.log(err)
//    })
}

export const getFeedsFromDB = ({dispatch}) => {
  db.allDocs({
    include_docs: true
  }).then(response => {
    var result = response.rows.map(entry => {
      return entry.doc
    })
    dispatch(types.DBFEEDSLOADED, result)
  }).catch(err => {
    console.log(err)
    //TODO: dispatch error mutation
  })
}

export const nukeDB = () => {
  db.destroy()
}
