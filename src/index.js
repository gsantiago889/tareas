const express = require('express')
const morgan = require('morgan')

const app = express()
const tasksRoute = require('./routes/tasks.routes')

//Middleware
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use(tasksRoute)

app.listen(3001)
console.log('server in port 3001');