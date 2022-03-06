const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  nickName: String,
  email: { type: String, required: true},

})

const Model = mongoose.model('Student', schema )
module.exports = Model