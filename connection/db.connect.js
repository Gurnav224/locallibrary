const mongoose = require('mongoose');

async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        if(connection){
            console.log('successfully connected to database?')
        }
    } catch (error) {
        console.error('failed to connected databse',error)
    }
}

module.exports = connectDB