const Category = require("../models/Category");
const fs = require('fs')
class CategController {
    async create(req, res) {
        try {
            const { titleUz, titleRu, textUz, textRu } = req.body;
            if (req.file !== undefined) {
                const categ = new Category({
                    ru: {
                        text: textRu,
                        title: titleRu
                    },
                    uz: {
                        text: textUz,
                        title: titleUz
                    },
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                const newcateg = categ.save()
                if (newcateg) {
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
    async getAll(req, res) {
        try {
            Category.aggregate([
                {
                    $group: {
                        _id: {
                            _id: '$_id',
                            ru: '$ru',
                            uz: '$uz',
                            images: '$images',
                            date: '$date'
                        },
                    }
                }
            ]).then(data => res.json(data))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async delete(req, res) {
         Category.findOneAndRemove(req.params.id)
            .then((data) => {
                fs.unlinkSync(`${data.images.path}`)
            })
            .then(() => {
                res.status(200).json({ message: "Удалился" })
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async read(req, res) {
        await Category.findById(req.params.id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err })
            })
    }
    async update(req, res) {
        const { titleUz, titleRu, textUz, textRu } = req.body;
        try {
            if (req.file !== undefined) {
                const categId = await Category.findById(req.params.id);
                fs.unlinkSync(`./${categId.images.path}`)
                await Category.findOneAndUpdate(req.params.id, {
                    ru: {
                        text: textRu,
                        title: titleRu
                    },
                    uz: {
                        text: textUz,
                        title: titleUz
                    },
                    images: {
                        name: req.file.filename,
                        path: req.file.path
                    }
                })
                res.json({ msg: "Update Success" })
            } else {
                await Category.findOneAndUpdate(req.params.id, {
                    ru: {
                        text: textRu,
                        title: titleRu
                    },
                    uz: {
                        text: textUz,
                        title: titleUz
                    },
                })
                res.json({ msg: "Update Success" })
            }
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new CategController()