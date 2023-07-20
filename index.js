const express = require('express')
const db = require('./db/db')
const routes = require('./routes/routes')
require('./middlewares/auth')

const app = express()

db() // Connexion à la base de données

app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(3000, () => console.log("Je tourne sur le port 3000"))