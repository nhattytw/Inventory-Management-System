require('dotenv').config({ path: './.env' })
const express = require('express')
const cors = require('cors')
const app = express()

// Parse application/json
app.use(express.json())

app.use(cors())

//Routes
const user = require('./routes/userRoute')
const product = require('./routes/productRoute')
const stock = require('./routes/stokeRoute')

app.use('/api', user)
app.use('/api', product)
app.use('/api', stock)

//Backend server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})