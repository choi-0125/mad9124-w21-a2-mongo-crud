const express = require('express');
const validateStudentId = require('../middleware/validateStudentId');
const sanitizeBody = require('../middleware/sanitizeBody')
const router = express.Router();
const Student = require('../models/Student')
const debug = require('debug')


// validate:
router.use('/:studentId', validateStudentId)

router.get('/', async (req, res) => {
  const students = await Student.find()
  res.json({ data: students.map(student => formatResponseData('students', student.toObject()))
  })
})


router.get('/:studentId', async (req, res) => {
  let id = req.params.studentId
  let student = await Student.findById(id)
  res.send({data: formatResponseData('students', student.toObject())})
});

router.post('/', sanitizeBody, async (req, res)=>{
  // 1. get data from req.body
  // const attributes = req.body.data.attributes
  const type = req.body.data.type
  // 2. check type
  if (type === 'students') {
    let newStudent = new Student(req.sanitizedBody)

  await newStudent.save()

    res.status(201).json({ data: formatResponseData('students', newStudent._doc)})
  } else {
    res.status(400).json({
      errors: [
        {
          status: '400',
          title: 'invalid type',
          message: `expected type student but received ${data?.type}`
        }
      ]
    })
  }
})

router.put('/:studentId', sanitizeBody, async (req, res) => {
  //we want to replace everything except id
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentId,
    {...req.sanitizedBody},
    {
      new: true,
      overwrite: true,
      runValidators: true
    })

    console.log(updatedStudent)

  res.send({data: formatResponseData('students', updatedStudent._doc) });
});

router.patch('/:studentId', sanitizeBody, async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentId,
    {_id: req.params.id, ...req.sanitizedBody},
    {
      new: true,
      runValidators: true
    })

    

  res.send({data: formatResponseData('students', updatedStudent._doc) });

});

router.delete('/:studentId', async (req, res) => {
  const id = req.params.studentId
  const deletedStudent = await Student.findByIdAndRemove(id)

  res.json({
    data: formatResponseData('students', deletedStudent._doc),
    meta: {message: `student with id: ${id} successfully deleted`}
  })
})

/**
 * 
 * @param {string} type 
 * @param {Object} resource 
 * @returns 
 */

function formatResponseData(type, res) {
  const {_id, ...attributes} = res;
  return {type, id: _id, attributes};
}

module.exports = router