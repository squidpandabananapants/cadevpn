// this initiates an express.js app that supports two endpoints

// endpoints
// a. /download/:pubkey => generates a new unique download object as a bandwidth test
// b. /downloads/ => lists past downloads

const express = require('express')
const sha256 = require('sha256')

const app = express()
let downloads = {};


app.get('/download/:pubkey', function (req, res) {
  let payload = generateRandomString(1);
  downloads[req.params.pubkey] = sha256(payload, { asString: true });
  console.log('downloads is now', downloads)
  res.send(payload);
})

app.get('/downloads', function (req, res) {
    console.log('called downloads, checking  ', downloads)
    res.json({ "downloads" : downloads });
})

app.listen(3001)


// support
function generateRandomString(sizeInMB) {
    const sizeInBytes = sizeInMB * 1024 * 1024;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < sizeInBytes; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
