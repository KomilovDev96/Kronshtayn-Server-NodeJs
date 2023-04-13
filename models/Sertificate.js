const { Schema, model, ObjectId } = require("mongoose")

const Sertifacate = new Schema({
    images: {
        name: {
            type: String,
        },
        path: {
            type: String,
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = model('Sertifacate', Sertifacate)
