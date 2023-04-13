const News = require("../models/News");
const fs = require('fs')
class NewsController {
    async create(req, res) {
        try {
            const { titleUz, titleRu, textUz, textRu, categoryId } = req.body;
            if (req.file !== undefined) {
                const news = new News({
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
                    }
                })
                const newnews = news.save()
                if (newnews) {
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
        console.log(req.params.id);
        await News.findByIdAndDelete(req.params.id)
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
        await News.findById(req.params.id)
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
                const newsId = await News.findById(req.params.id);
                fs.unlinkSync(`./${newsId.images.path}`)
                await News.findOneAndUpdate(req.params.id, {
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
                    }
                })
                res.json({ msg: "Update Success" })
            } else {
                await News.findOneAndUpdate(req.params.id, {
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
            News.find().sort({date: -1}).then(data => res.json(data))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new NewsController()