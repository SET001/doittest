const parse = require('csv-parse/lib/sync')
const {uniq, map, length, keys, flatten, filter} = require('ramda')
const {fieldMapping, cadence} = require('./config')
const {Patient} = require('./schemas/patient')
const {Email} = require('./schemas/email')
var mongoose = require('mongoose');


const capitalizeFirstChar = name => name.charAt(0).toUpperCase() + name.slice(1)
const capitalizeNotFirstWord = (name, index) => index ? capitalizeFirstChar(name) : name
const mapField = fieldName => fieldName
  .toLowerCase()
  .replace(/[^\w\s]/g, '')
  .split(' ')
  .filter(string=>string.length)
  .map(capitalizeNotFirstWord)
  .join('')

const mapObjectFields = object => Object
  .entries(object)
  .filter(([key, value])=>typeof fieldMapping[key] !== 'undefined')
  .reduce((acc, [key, value])=> Object.assign(acc, {[fieldMapping[key]? fieldMapping[key] : mapField(key)]: value}), {})

const formatters = {
  consent: value => value === 'Y',
  birthDate: value => new Date(value).valueOf()
}

const formatToInner = object => Object
  .entries(object)
  .reduce((acc, [key, value])=> Object.assign(acc, {[key] : formatters[key]? formatters[key](value) : value}), {})

const parseCSV = (data)=>{
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    delimiter: '|',
  })
  return map(formatToInner, map(mapObjectFields, records))
}

const importData = data =>
  Promise.all(data.map(async item=>{
    const patient = new Patient(item);
    
    if (item.consent){
      patient.emails = cadence.map(day=>({
        patient: patient._id,
        sent: false,
        date: Date(day)
      }))
    }
    return patient.save();
  }))

const list = async (params = {}) => Patient.find(params);
const listMissingFirstName = ()=> Patient.find({firstName:  ''})
const listWithConsentAndNoEmail = ()=>Patient.find({consent: true, email: ''})


const reset = async ()=> {
  const collectionExist = !! await mongoose.connection.db
    .listCollections({name: 'patients'})
    .toArray()
    .then(length)
  if (collectionExist){
    console.log('removing collection')
    return Patient.collection.drop();
  }
};

  


// const withConsentAndNoEmail = filter((item)=> item.consent === 'Y' && !item.email )
// const withNoFirstName = filter((item)=> !item.firstName )

// console.log(withConsentAndNoEmail(formatedRows))
// console.log(withNoFirstName(formatedRows))


module.exports = {parseCSV, importData, list, listMissingFirstName, listWithConsentAndNoEmail, reset}