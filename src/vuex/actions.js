import * as types from './mutation-types'
import parsePodcast from 'node-podcast-parser'
import Vue from 'vue'
import pouch from 'pouchdb'
import pouchdbFind from 'pouchdb-find'

pouch.plugin(pouchdbFind)

const db = new pouch('podcasts')
const remoteCouch = false

db.createIndex({
    index: {
      fields: ['published', 'title', 'duration'],
      name: 'episode'
    }
}).then(res => {
  console.log('created episode index')
}).catch(err => {
  console.log(err)
})

db.createIndex({
    index: {
      fields: ['updated', 'title'],
      name: 'podcast'
    }
}).then(res => {
  console.log('created podcast index')
}).catch(err => {
  console.log(err)
})

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
    // TODO: proxy through a local server and sanitize instead of bypassing cors...
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
  //optimisticallu creating the unheard list
  dispatch(types.SETUNHEARD)

  let {episodes, ...theRest} = state.app.newFeedResult
  var newCast = theRest

  newCast['episodes'] = episodes.map(ep => { return ep.guid })
  newCast['name'] = 'podcast'

  var eps = episodes.map(ep => { 
    ep._id = ep.enclosure.url 
    ep.name = "episode"
    return ep
  })

  db.put(newCast, newCast.link).then(res => {
    db.bulkDocs(eps).then(res => {
      dispatch(types.ADDNEWFEED, newCast, episodes)
    })
  }).catch(err => {
    console.log(err)
    //TODO: flash error
  })
}

export const updateProgress = ({dispatch, state}, time) => {
  dispatch(types.TIMEUPDATE, time)
}

export const updateQueue = ({dispatch, state}, newQueue) => {

}

export const getFeedsFromDB = ({dispatch}) => {
  db.find({
    selector: {name: {$eq: 'episode'}},
  }).then(eps => {
    db.find({
      selector: {name: {$eq: 'podcast'}},
    }).then(casts => {
      dispatch(types.DBFEEDSLOADED, eps.docs, casts.docs)
    })
  }).catch(err => {
    console.log(err)
    //TODO: flash error
  })
}

export const nukeDB = () => {
  db.destroy()
}
