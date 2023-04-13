const Materials = require("../models/Materials");
const fs = require('fs')
class MaterialController {
    async create(req, res) {
        try {
            const { settings, proizId } = req.body;
            const ParseSttings = JSON.parse(settings)
            if (req.file !== undefined) {
                const mater = new Materials({
                    translations: ParseSttings,
                    proizId: proizId,
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                const newmater = await mater.save()
                if (newmater) {
                    return res.json({ message: "success"})
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
        await Materials.findByIdAndDelete(req.params.id)
            .then((data) => {
                fs.unlinkSync(`./${data.images.path}`)
            })
            .then((data) => {
                res.status(200).json({ message: "Удалился" });
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async update(req, res) {
        const { settings, proizId } = req.body
        try {
            if (req.file !== undefined) {
                const meterId = await Materials.findById(req.params.id);
                console.log(meterId);
                fs.unlinkSync(`./${meterId.images.path}`)
                await Materials.findOneAndUpdate(req.params.id, {
                    translations: settings,
                    proizId: proizId,
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                res.json({ msg: "Update Success" })
            } else {
                await Materials.findOneAndUpdate(req.params.id, {
                    translations: settings,
                    proizId: proizId,
                })
                res.json({ msg: "Update Success" })
            }
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async read(req, res) {
        await Materials.findById(req.params.id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async getAllProiz(req, res) {
        try {
            Materials.find().populate('proizId').select('translations proizId date images').then(data => {
                res.json(data);
            }).catch(err => res.status(400).json({ message: "Ошибка при запросе", err }))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async getAll(req, res) {
        try {
            Materials.find().then(data => {
                res.json(data);
            }).catch(err => res.status(400).json({ message: "Ошибка при запросе", err }))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new MaterialController()