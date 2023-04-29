const { Schema, model } = require("mongoose")

const ContactEdit = new Schema({
    title: String,
    text: String,
    telegram: String,
    instagram: String,
    phone: String,
    adress: String,
    adressMap: String,
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = model('ContactEdit', ContactEdit)
