const Komponey = require('../models/Komponey')
const fs = require('fs')
class ComponeyController {
    async create(req, res) {
        try {
            if (req.file !== undefined) {
                const sert = new Komponey({
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                const newsertif = sert.save()
                if (newsertif) {
                    return res.json({ message: "success", sert })
                }
            }
            else {
                return res.status(400).json({ message: "Нету Файла" })
            }

        } catch (err) {
            return res.status(500).json({ message: "Server Error", code: err, status: 500 })
        }
    }
    async delete(req, res) {
        await Komponey.findByIdAndDelete(req.params.id)
            .then((data) => {
                fs.unlinkSync(`./${data.images.path}`)
            })
            .then(() => {
                res.status(200).json({ message: "Удалился" })
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async read(req, res) {
        await Komponey.findById(req.params.id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async update(req, res) {
        try {
            if (req.file !== undefined) {
                const sertId = await Komponey.findById(req.params.id);
                fs.unlinkSync(`./${sertId.images.path}`)
                await Komponey.findOneAndUpdate(req.params.id, {
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                res.json({ msg: "Update Success" })
            } else {
                res.json({ msg: "Нету файла" })
            }
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async getAll(req, res) {
        try {
            Komponey.find().sort({ date: -1 }).then(data => res.json(data))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async getfive(req, res) {
        const { id } = req.params
        try {
            Komponey.find().limit(id).then(data => res.json(data))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new ComponeyController()