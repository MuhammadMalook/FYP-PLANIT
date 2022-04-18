const express = require('express') 
const app = new express()
var cors = require('cors')
app.use(express.json())
const personRoutes = require('./Routes/PersonRoutes')
// const eventRoutes = require('./Routes/EventRoutes')
// const taskRoutes = require('./Routes/TasksRoutes')
// const noteRoutes = require('./Routes/NotesRouter')

app.use(cors())

app.use(personRoutes)
// app.use(eventRoutes)

// app.use(taskRoutes)
// app.use(noteRoutes)

module.exports = app;