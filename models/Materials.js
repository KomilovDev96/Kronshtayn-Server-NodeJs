const { Schema, model, ObjectId } = require("mongoose")

const Materials = new Schema({
    translations: [
        {
            language: { type: String, required: true },
            value: { type: String, required: true },
            key: { type: String, required: true },
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    },
    proizId: {
        type: ObjectId,
        ref: "Proiz"
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

module.exports = model('Materials', Materials)
