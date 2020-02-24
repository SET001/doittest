const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Email = new Schema({
  date: Date,
  sent: Boolean
});

module.exports = {Email}
