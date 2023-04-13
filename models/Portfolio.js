const { Schema, model, ObjectId } = require("mongoose")

const Portfolio = new Schema({
    ru: {
        title: String,
        text: String
    },
    uz: {
        title: String,
        text: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    images: {
        name: {
            type: String,
        },
        path: {
            type: String,
        }
    },
})

module.exports = model('Portfolio', Portfolio)
