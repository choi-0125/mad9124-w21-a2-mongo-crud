const Course = require('../models/Course')

const validateCourseId = async function (req, res, next){
  let course = null
  const id = req.params.courseId;
  if(id.length  === 24) {
    course = await Course.findById(id)
  } 
  if(course === null){
    res.status(404).send({
      errors: [
        {
          status: '404',
          title: 'Resource does not exist',
          description: `We could not find a course with id: ${id}`
        }
      ]
    })

  }
  if (course != null) {
    next();
  }

  

}

module.exports = validateCourseId
