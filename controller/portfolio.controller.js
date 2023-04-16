const Portfolio = require("../models/Portfolio");
const fs = require('fs')
class PortfolioController {
    async create(req, res) {
        try {
            const { titleUz, titleRu, textUz, textRu, categoryId } = req.body;
            if (req.file !== undefined) {
                const news = new Portfolio({
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
        await Portfolio.findByIdAndDelete(req.params.id)
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
        await Portfolio.findById(req.params.id)
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
                const newsId = await Portfolio.findById(req.params.id);
                fs.unlinkSync(`./${newsId.images.path}`)
                await Portfolio.findOneAndUpdate(req.params.id, {
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
                await Portfolio.findOneAndUpdate(req.params.id, {
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
            Portfolio.find().sort({ date: -1 }).then(data => res.json(data))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
    async getfive(req, res) {
        const { id } = req.params
        try {
            Portfolio.find().limit(id).then(data => res.json(data))
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err })
        }
    }
}


module.exports = new PortfolioController()