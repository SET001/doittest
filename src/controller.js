const {parseCSV, importData, drop, list, listMissingFirstName, listWithConsentAndNoEmail, reset} = require('./service')
const {toListObj, asMiddleware} = require('./utils')
const {fieldMapping, cadence} = require('./config')

module.exports = asMiddleware({
  reset,
  importCSV: async (req, res) => {
    if (req.files.data){
      const parsedData = parseCSV(req.files.data.data);
      await importData(parsedData);
    }
  },
  verifyEmailsForConsented: async (req, res)=>{
    const patients = await list({
      consent: true
    })
    res.send(patients.filter(patient=>patient.emails.length<cadence.length))
  },
  ...toListObj({
    list,
    listMissingFirstName,
    listWithConsentAndNoEmail
  })
})