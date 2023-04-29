const ContactEdit = require('../models/ContactEdit')
const fs = require('fs')


class ContactEdidController {
    async create(req, res) {
        const { ...rest } = req.body
        try {
            const contactEdit = new ContactEdit(rest)
            const newContEd = contactEdit.save()
            if (newContEd) {
                return res.json({ message: "success", })
            }
        } catch (err) {
            return res.status(500).json({ message: "Проблемы!" })
        }
    }
    async read(req, res) {
        await ContactEdit.findById(req.params.id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async delete(req, res) {
        await ContactEdit.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Удалился" })
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async update(req, res) {
        const { ...rest } = req.body
        try {
            await ContactEdit.findOneAndUpdate(req.params.id, rest)
            res.json({ msg: "Update Success" })
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async getall(req, res) {
        try {
            await ContactEdit.findOne().then(data => {
                return res.json(data)
            })
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new ContactEdidController()