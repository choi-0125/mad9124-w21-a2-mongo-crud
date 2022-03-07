const debug = require('debug')('sanitize:body')
const xss = require('xss')

const sanitize = sourceString => {
  return xss(sourceString, {
        whiteList: [],
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
      })
}

const stripTags = payload => {
  let attributes = {...payload}
  for(let key in attributes){
    if (attributes[key] instanceof Object){
      attributes[key] = stripTags(attributes[key])
    } else if (attributes[key] instanceof Array) {
      attributes[key] = attributes[key].map( element => {
        return typeof element === 'string' ? sanitize(element) : stripTags(element)
      })
    } else {
      attributes[key] = sanitize(attributes[key])
    }
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