const Proiz = require("../models/Proizvodstvo");
const fs = require('fs')
class ProizController {
    async create(req, res) {
        try {
            const {
                titleUz,
                titleRu,
                textUz,
                textRu,
                categoryId,
                ...rest
            } = req.body;

            if (req.file !== undefined) {
                const proiz = new Proiz({
                    ru: {
                        text: textRu,
                        title: titleRu
                    },
                    uz: {
                        text: textUz,
                        title: titleUz
                    },
                    categoryId: categoryId,
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    },
                    parametrs: rest
                })
                const newproiz = proiz.save()
                if (newproiz) {
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
        await Proiz.findOneAndRemove(req.params.id)
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
        await Proiz.findById(req.params.id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async update(req, res) {
        const { titleUz, titleRu, textUz, textRu, categoryId } = req.body;
        try {
            if (req.file !== undefined) {
                const proizId = await Proiz.findById(req.params.id);
                fs.unlinkSync(`./${proizId.images.path}`)
                await Proiz.findOneAndUpdate(req.params.id, {
                    ru: {
                        text: textRu,
                        title: titleRu
                    },
                    uz: {
                        text: textUz,
                        title: titleUz
                    },
                    categoryId: categoryId,
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    },
                })
                res.json({ msg: "Update Success" })
            } else {
                await Proiz.findOneAndUpdate(req.params.id, {
                    ru: {
                        text: textRu,
                        title: titleRu
                    },
                    uz: {
                        text: textUz,
                        title: titleUz
                    },
                    categoryId: categoryId,
                })
                res.json({ msg: "Update Success" })
            }
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async getAll(req, res) {
        try {
            Proiz.aggregate([
                {
                    $group: {
                        _id: {
                            _id: '$_id',
                            ru: '$ru',
                            uz: '$uz',
                            images: '$images',
                            date: '$date',
                            parametrs: '$parametrs',
                        },
                    }
                }
            ]).then(data => res.json(data))
        }catch(err){
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new ProizController()