const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const {
  reset, importCSV, list, listMissingFirstName, listWithConsentAndNoEmail, verifyEmailsForConsented } = require('./controller')

app.use(fileUpload({
  createParentPath: true
}));

const port = 8080;

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://mongo:27017/doittest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'user',
    pass: 'password'
  })
  .then(() => console.log(`Successfully connect to MongoDB.`))
  .catch(err => console.error(`MongoDB connection error: ${err.message}`))
    

const ok = (req, res)=> res.send('OK')
const sendIDs = (req, res) => res.send(res.list.map(item=>item.id));
const sendList = (req, res) => res.send(res.list);
const sendListLength = (req, res) => res.send({count: res.list.length});

app.post('/patient/count', list, sendListLength);
app.post('/patient/list', list, sendList);
app.post('/patient/listMissingFirstName', listMissingFirstName, sendIDs);
app.post('/patient/listWithConsentAndNoEmail', listWithConsentAndNoEmail, sendIDs);
app.post('/patient/verifyEmailsForConsented', verifyEmailsForConsented);
app.post('/health', ok);
app.post('/reset', reset, ok);
app.post('/import', importCSV, ok)

app.listen(port);