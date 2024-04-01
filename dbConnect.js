const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

mongoose.set("strictQuery", false)

const connectToDB = async (_req, res) => {
      try {
            await mongoose
                  .connect(
                        DB_URL
                  )

            console.log("Successfully connected to MongoDB.")

      } catch (error) {
            console.log(`Can't connect to MongoDb! Please make sure you are connected to the internet.`)
            console.error(error.message)
      }
}

module.exports = connectToDB