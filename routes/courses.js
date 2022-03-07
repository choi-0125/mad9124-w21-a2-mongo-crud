const express = require('express');
const validateCourseId = require('../middleware/validateCourseId');
const router = express.Router();
const Course = require('../models/Course')

// validate:
router.use('/:courseId', validateCourseId)

router.get('/', async (req, res) => {
  const courses = await Course.find()
  res.json({ data: courses.map(course => formatResponseData('courses', course.toObject()))
  })
})

module.exports = router