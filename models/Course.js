const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  code: {type: String, required: true, max: 16},
  title: {type: String, required: true, max: 255},
  description: {type: String, max: 2048},
  url: {type: String, max: 512},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
})

const Model = mongoose.model('Course', schema )

module.exports = Model