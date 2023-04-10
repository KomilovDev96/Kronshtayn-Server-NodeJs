const { Schema, model, ObjectId } = require("mongoose")

const Proiz = new Schema({
    materials: {
        images: {
            name: {
                type: String,
            },
            path: {
                type: String,
            }
        },
        options: [
            {
                language: { type: String },
                value: { type: String },
                key: { type: String },
            }
        ]
    },
    ru: {
        title: String,
        text: String,
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
