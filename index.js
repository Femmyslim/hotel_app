require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { uuid } = require('uuidv4');
const app = express()
const port = process.env.APP_PORT
const bookingRoutes  = require('./routes/booking.routes')

app.use(bodyParser.json())
app.use(bookingRoutes)




app.listen(port, () =>{
    console.log(`This is listening on port ${port}`)
})