const axios = require('axios');
const sha256 = require('sha256')

// let mock_pubkey = 'abc1234'

pushOne('abc1234')
pushOne('xyz0987')
checkResult('bababa', 'shshshsh')


function pushOne (mock_pubkey) {

    axios.get('http://localhost:3001/download/' + mock_pubkey)
    .then(function (payload) {
      // console.log('got payload', payload)
      // handle success
      let hash = sha256(payload.data.toString(), { asString: true })
      
      // console.log('got hash for ' + mock_pubkey, hash);
      
      checkResult(mock_pubkey, hash);
    })
}

function checkResult (mock_pubkey, hash) {
    console.log('checking if ' + mock_pubkey + ' was uploaded ')
    axios.get('http://localhost:3001/downloads/' + encodeURIComponent(hash) )
      .then(function (result) {
        console.log('got result', result.data)
          let pubkey = result.data;
          if (result) {
              console.log('found pubkey for ' + hash)
              console.log('got pubkey', pubkey)
              console.log('check success', (pubkey === mock_pubkey) )
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