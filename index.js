const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const PORT = 2023
const app = express();
app.use(cors())
app.use(bodyParser())

const { expenseRouter } = require('./router')

app.use('/api', expenseRouter)

app.listen(PORT, () => console.log("Server Running at PORT " + PORT))