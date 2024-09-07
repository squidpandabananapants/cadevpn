const axios = require('axios');
const sha256 = require('sha256')

// let mock_pubkey = 'abc1234'
// let server_url = 'http://localhost:3001/download/';
let server_url = 'http://ec2-34-207-236-225.compute-1.amazonaws.com/';

pushOne('abc1234')
pushOne('xyz0987')
checkResult('bababa', 'shshshsh')

// run the 'download test' 
function pushOne (mock_pubkey) {
    let request_url = server_url + 'download/' + mock_pubkey;
    console.log('about to make request to ', request_url)
    try {
      axios.get(request_url)
      .then(function (payload) {

        let hash = sha256(payload.data.toString(), { asString: true })
        
        // NOTE: This hash is the 'submission' to K2

        checkResult(mock_pubkey, hash);
      })

    } catch (err) {
      console.log('error in pushOne for ' + mock_pubkey)
    }
}

// This is the core process for 'validateNode' during the audit phase
function checkResult (mock_pubkey, hash) {
    console.log('checking if ' + mock_pubkey + ' was uploaded ')
    let query = server_url + 'downloads/' + encodeURIComponent(hash) ;
    console.log('query is ' + query)
    try {
      axios.get(query)
        .then(function (result) {
            let pubkey = result.data;
            if (result) {
                let audit_result = (pubkey === mock_pubkey);
                console.log('verification resolved ', audit_result)
            } else {
                console.log('no reply for downloads')
            }
        })
  
    } catch (err) {
      console.log('error in checkResult for ' + mock_pubkey)
    }
}