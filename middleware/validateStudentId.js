// const { students } = require("../data/students");
const Student = require('../models/Student')


const validateStudentId = async function (req, res, next){
  let student = null
  const id= req.params.studentId;
  if(id.length === 24) {
    student = await Student.findById(id)
  }
  if(student === null){
    res.status(404).send({
      errors: [
        {
          status: '404',
          title: 'Resource does not exist',
          description: `We could not find a student with id: ${id}`
        }
      ]
    })

  }
  if (student != null) {
    next();
  }

  

}

module.exports = validateStudentId
