const express = require('express');
const validateCourseId = require('../middleware/validateCourseId');
const router = express.Router();
const Course = require('../models/Course')
const sanitizeBody = require('../middleware/sanitizeBody')

// validate:
router.use('/:courseId', validateCourseId)

router.get('/', async (req, res) => {
  const courses = await Course.find()
  res.json({ data: courses.map(course => formatResponseData('courses', course.toObject()))
  })
})

router.get('/:courseId', async(req, res) => {
  let id = req.params.courseId
  let course = await Course.findById(id)
  res.send({data: formatResponseData('courses', course.toObject())})
})

router.post('/', sanitizeBody, async (req, res)=>{
  // 1. get data from req.body
  const type = req.body.data.type
  // 2. check type
  if (type === 'courses') {
    console.log(req.sanitizedBody)
    
    let newCourse = new Course(req.sanitizedBody)
    console.log(newCourse)
    await newCourse.save()
    // res.status(201).json({ data: formatResponseData('courses', newCourse._doc)})
    res.status(201).json({data: newCourse})
  } else {
    res.status(400).json({
      errors: [
        {
          status: '400',
          title: 'invalid type',
          message: `expected type course but received ${data?.type}`
        }
      ]
    })
  }
})

router.put('/:courseId', async (req, res) => {
  //we want to replace everything except id
  const {_id, ...otherAttributes} = req.body.data.attributes
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.courseId,
    {...otherAttributes},
    {
      new: true,
      overwrite: true,
      runValidators: true
    })

    console.log(updatedCourse)

  res.send({data: formatResponseData('courses', updatedCourse._doc) });
});

router.patch('/:courseId', async (req, res) => {
  const {...attributes} = req.body.data.attributes
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.courseId,
    {_id: req.params.courseId, ...attributes},
    {
      new: true,
      runValidators: true
    })

  res.send({data: formatResponseData('courses', updatedCourse._doc) });

});

router.delete('/:courseId', async (req, res) => {
  const id = req.params.courseId
  const deletedCourse = await Course.findByIdAndRemove(id)

  res.json({
    data: formatResponseData('courses', deletedCourse._doc),
    meta: {message: `course with id: ${id} successfully deleted`}
  })
})

function formatResponseData(type, res) {
  const {_id, ...attributes} = res;
  return {type, id: _id, attributes};
}

module.exports = router