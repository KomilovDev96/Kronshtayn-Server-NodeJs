const Contact = require("../models/Contact");

const fs = require('fs')
class ContactController {
    async create(req, res) {
        const { ...rest } = req.body;
        if (req.file !== undefined) {
            const news = new Contact({
                informations: rest,
                files: {
                    name: req.file.filename,
                    path: req.file.path
                }
            })
            const newnews = news.save()
            if (newnews) {
                return res.json({ message: "success", })
            }
        } else {
            return res.status(400).json({ message: "Нету Файла" })
        }
    }
    async delete(req, res) {
        await Contact.findOneAndRemove(req.params.id)
            .then((data) => {
                fs.unlinkSync(`./${data.files.path}`)
            })
            .then(() => {
                res.status(200).json({ message: "Удалился" })
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async read(req, res) {
        try {
            await Contact.findById(req.params.id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
        }catch(err){
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async getAll(req, res) {
        try {
            Contact.find().then(data => {
                res.status(200).json(data)
            })
        }catch(err){
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new ContactController()