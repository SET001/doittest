const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Email} = require('./email')

const Patient = mongoose.model('Patient', new Schema({
  source: String,
  cardNumebr: String,
  memberId: Number,
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  email: String,
  consent: Boolean,
  mobile: String,
  phone: String,
  emails: [Email]
}));

module.exports = {Patient}
