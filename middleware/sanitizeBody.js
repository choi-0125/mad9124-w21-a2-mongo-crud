const debug = require('debug')('sanitize:body')
const xss = require('xss')

module.exports = (req, res, next) => {
  console.log("-------------------sanitizing-------------------")
  console.log(req.body.data.attributes)
  const {id, _id, ...attributes} = req.body.data.attributes
  console.log(attributes)
  for (let key in attributes) {
    attributes[key] = xss(attributes[key], {
      whiteList: [],
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script']
    })
  }
  console.log(attributes)
  req.sanitizedBody = attributes
  next()
}