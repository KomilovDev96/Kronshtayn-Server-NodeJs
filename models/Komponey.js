const { Schema, model, ObjectId } = require("mongoose")

const Komponey = new Schema({
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

module.exports = model('Komponey', Komponey)
