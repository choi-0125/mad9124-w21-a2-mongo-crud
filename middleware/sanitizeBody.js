const debug = require('debug')('sanitize:body')
const xss = require('xss')

const stripTags = payload => {
  console.log(payload)
  let attributes = {...payload}
  for(let key in attributes){
    attributes[key] = xss(attributes[key], {
      whiteList: [],
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script']
    })
  }
  return attributes
}

module.exports = (req, res, next) => {
  console.log("-------------------sanitizing-------------------")
  const {id, _id, ...attributes} = req.body.data.attributes
  const sanitizedBody = stripTags(attributes)
  console.log(sanitizedBody)
  req.sanitizedBody = sanitizedBody
  next()
}