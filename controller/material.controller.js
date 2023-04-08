const Materials = require("../models/Materials");
const fs = require('fs')
class MaterialController {
    async create(req, res) {
        try {
            const { settings, proizId } = req.body;
            if (req.file !== undefined) {
                const mater = new Materials({
                    translations: settings,
                    proizId: proizId,
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                const newmater = await mater.save()
                if (newmater) {
                    return res.json({ message: "success", })
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
        await Materials.findOneAndRemove(req.params.id)
            .then((data) => {
                fs.unlinkSync(`./${data.images.path}`)
            })
            .then(() => {

            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async update(req, res) {
        const { settings, proizId } = req.body;
        try {
            if (req.file !== undefined) {
                const newsId = await News.Materials(req.params.id);
                fs.unlinkSync(`./${newsId.images.path}`)
                await News.findOneAndUpdate(req.params.id, {
                    translations: settings,
                    proizId: proizId,
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                res.json({ msg: "Update Success" })
            } else {
                await News.findOneAndUpdate(req.params.id, {
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
    async getAll(req, res) {
        try {
            Materials.find().then(data => {
                res.status(200).json(data);
            }).catch(err => {
                res.status(400).json(err);
            })
        }catch(err){
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new MaterialController()