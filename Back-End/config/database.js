const mongoose = require('mongoose')
// const {ServerApiVersion} = require('mongodb')
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // serverApi: ServerApiVersion.v1
        }, err => {
            if (err) throw err;
            console.log('Connected to MongoDB!!!')
        })
}

module.exports = connectDatabase;
