const express = require('express');
const router = express.Router();
const Student = require('../models/Student')

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

router.post('/', async (req, res)=>{
  // 1. get data from req.body
  const attributes = req.body.data.attributes
  const type = req.body.data.type
  // 2. check type
  if (type === 'students') {
    let newStudent = new Student(attributes)

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

router.put('/:studentId', async (req, res) => {
  //we want to replace everything except id
  const {_id, ...otherAttributes} = req.body.data.attributes
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentId,
    {...otherAttributes},
    {
      new: true,
      overwrite: true,
      runValidators: true
    })

    console.log(updatedStudent)

  res.send({data: formatResponseData('students', updatedStudent._doc) });
});