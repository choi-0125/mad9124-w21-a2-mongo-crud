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