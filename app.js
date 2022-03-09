// Don't forget to use NPM to install Express and Mongoose.
'use strict'

//load dependecies
const morgan = require('morgan');
const express = require('express');
const studentsRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');

const connectDatabase = require('./startup/connectDatabase.js')
connectDatabase()


const app = express();

app.use( morgan('tiny') );
app.use( express.json() );

app.use('/api/students', studentsRouter);
app.use('/api/courses', coursesRouter);

const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port} ...`))