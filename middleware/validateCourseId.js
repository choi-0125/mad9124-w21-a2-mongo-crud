const Student = require('../models/Student')

const validateStudentId = async function (req, res, next){
  
  const id= req.params.studentId;
  // const index = students.findIndex(student => parseInt(student.id) == id )
  let student = await Student.findById(id)
  if(student === null || id.length != 24){
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
