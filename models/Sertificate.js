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
})

module.exports = model('Sertifacate', Sertifacate)
