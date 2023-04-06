const { Schema, model } = require("mongoose")

const Contact = new Schema({
    informations: {
        name: {
            type: String,
        },
        familiya: {
            type: String,
        },
        telefon: {
            type: String,
        },
        email: {
            type: String,
        }
    },
    status: {
        type: Boolean,
        default: false
    },
    files: {
        name: {
            type: String,
        },
        path: {
            type: String,
        }
    },

})

module.exports = model('Contact', Contact)
