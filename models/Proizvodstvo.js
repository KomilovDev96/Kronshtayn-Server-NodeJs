const { Schema, model, ObjectId } = require("mongoose")

const Proiz = new Schema({
    parametrs: {
        title: String,
        material: String,
        talshina: String,
        vilet: String,
    },
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
    images: [Object],
})

module.exports = model('Proiz', Proiz)
