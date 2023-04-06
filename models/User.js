const { Schema, model, ObjectId } = require("mongoose")


const User = new Schema({
    login: { 
        type: String, 
        required: true, 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        required: true
    },
    avatar: { 
        type: String 
    },
})

module.exports = model('User', User)
