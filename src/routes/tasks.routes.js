const {Router} = require('express')

const router = Router()
const pool = require('../db.js')
const { index, createTasks, returnAllTasks, updateTasks, deleteTasks, returnOneTask } = require('../controllers/tasks.controllers')

router.get('/', index)

router.get('/tasks', returnAllTasks)

router.get('/tasks/:id', returnOneTask)

router.post('/tasks', createTasks)

router.delete('/tasks/:id', deleteTasks)

router.put('/tasks/:id', updateTasks)

module.exports = router;