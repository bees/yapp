import pouch from 'pouchdb'
const db = new pouch('podcasts')
const remoteCouch = false;


export const addNewFeed = (newFeedObject) => {
    db.put(newFeedObject, newFeedObject.link).then(response => {
      //TODO: dispatch success mutation
    }).catch(err => {
      console.log(err)
      //TODO: dispatch error mutations
    })
}

export const getFeeds = () => {
  console.log(db.allDocs({
    include_docs: true
  }).then(response => {
    var result = response.rows.map(entry => {
      return entry.doc
    })
    return result 
    //TODO: dispatch success mutation
  }).catch(err => {
    console.log(err)
    //TODO: dispatch error mutation
  }))
}
