const { Schema, model, ObjectId } = require("mongoose")

const Proiz = new Schema({
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
    images: [{
        fileName: String,
        filePath: String,
        fileType: String,
        fileSize: String,
    }],
})

module.exports = model('Proiz', Proiz)
