const express = require('express');
const router = express.Router();
const Student = require('../models/Student')

router.get('/', async (req, res) => {
  const students = await Student.find()
  res.json({ data: students.map(student => formatResponseData('students', student.toObject()))
  })
})