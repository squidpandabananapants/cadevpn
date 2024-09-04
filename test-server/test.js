const axios = require('axios');
const sha256 = require('sha256')

// let mock_pubkey = 'abc1234'

pushOne('abc1234')
pushOne('xyz0987')


function pushOne (mock_pubkey) {

    axios.get('http://localhost:3001/download/' + mock_pubkey)
    .then(function (payload) {
      console.log('got payload', payload)
      // handle success
      let hash = sha256(payload.data.toString(), { asString: true })
      
      console.log('got hash for ' + mock_pubkey, hash);
      
      checkResult(mock_pubkey, hash);
    })
}

function checkResult (mock_pubkey, hash) {
    console.log('checking if ' + mock_pubkey + ' was uploaded ')
    axios.get('http://localhost:3001/downloads')
      .then(function (downloads) {
        console.log('got downloads', downloads.data)
          let history = downloads.data.downloads;
          if (history) {
              console.log('got history', history)
              console.log('found hash for ' + mock_pubkey)
              console.log('checking result ', history[mock_pubkey], 'vs', hash)
              let condition = ( hash == history[mock_pubkey] )
              console.log('hash matches?', condition)
          } else {
              console.log('no reply for downloads')
          }
      })
}
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });