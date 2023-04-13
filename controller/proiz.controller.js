const Proiz = require("../models/Proizvodstvo");
const fs = require("fs");
const fileSizeFomatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
        parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
};
class ProizController {
    async create(req, res) {
        try {
            const { titleUz, titleRu, textUz, textRu } = req.body;
            if (req.files !== undefined) {
                let filesArray = [];
                req.files.forEach((element) => {
                    const file = {
                        fileName: element.originalname,
                        filePath: element.path,
                        fileType: element.mimetype,
                        fileSize: fileSizeFomatter(element.size, 2),
                    };
                    filesArray.push(file);
                });
                const proiz = new Proiz({
                    ru: {
                        text: textRu,
                        title: titleRu,
                    },
                    uz: {
                        text: textUz,
                        title: titleUz,
                    },
                    images: filesArray,
                });
                const newproiz = proiz.save();
                if (newproiz) {
                    return res.json({ message: "success" });
                }
            } else {
                return res.status(400).json({ message: "Нету Файла" });
            }
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Server Error", code: err, status: 500 });
        }
    }
    async deleteImage(req, res) {
        try {
            Proiz.findOneAndUpdate(
                { _id: req.params.id }, // условие поиска документа
                { $pull: { images: { _id: req.params.iid } } } // удаление объекта по ID
                // { new: true } // возвращать измененный документ
            )
                .then((data) => {
                    const oneImage = data.images.filter(
                        (file) => file._id.toString() === req.params.iid
                    );
                    fs.unlinkSync(`./${oneImage[0].filePath}`);
                    res.json({ message: "Успещно удалился картинка производства" });
                })
                .catch((error) => {
                    console.error(`гдето ошибка: ${error}`);
                });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    async delete(req, res) {
        await Proiz.findById(req.params.id).then(data => {
            data.images.forEach((element) => {
                fs.unlinkSync(`./${element.filePath}`);
            });
        })
        await Proiz.findOneAndRemove(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Удалился" });
            })
            .catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err });
            });
    }
    async read(req, res) {
        await Proiz.findById(req.params.id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json({ message: "Ошибка сервера", err });
            });
    }
    async update(req, res) {
        const { titleUz, titleRu, textUz, textRu } = req.body;
        try {
            if (req.files !== undefined) {
                await Proiz.findById(req.params.id).then(data => {
                    data.images.forEach((element) => {
                        fs.unlinkSync(`./${element.filePath}`);
                    });
                })
                let filesArray = [];
                req.files.forEach((element) => {
                    const file = {
                        fileName: element.originalname,
                        filePath: element.path,
                        fileType: element.mimetype,
                        fileSize: fileSizeFomatter(element.size, 2),
                    };
                    filesArray.push(file);
                });
                await Proiz.findOneAndUpdate(req.params.id, {
                    ru: {
                        text: textRu,
                        title: titleRu,
                    },
                    uz: {
                        text: textUz,
                        title: titleUz,
                    },
                    images: filesArray,
                });
                res.json({ msg: "Update Success" });
            } else {
                await Proiz.findOneAndUpdate(req.params.id, {
                    ru: {
                        text: textRu,
                        title: titleRu,
                    },
                    uz: {
                        text: textUz,
                        title: titleUz,
                    },
                });
                res.json({ msg: "Update Success" });
            }
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err });
        }
    }
    async getAllMater(req, res) {
        try {
            Proiz.aggregate([
                {
                    $lookup: {
                        from: 'materials',
                        localField: '_id',
                        foreignField: 'proizId',
                        as: 'materials'
                    }
                },
                {
                    $unwind: {
                        path: '$materials'            // faqat shu movies borlarni ko'rsatadi
                    }
                },
                {
                    $group: {
                        _id: {
                            _id: '$_id',
                            ru: '$ru',
                            uz: '$ru',
                            images: "$images"
                        },
                        materials: {
                            $push: '$materials'
                        }
                    }
                },
                // { // qisqartirish uslubi 
                //     $project: {
                //         _id: '$_id._id',
                //         trans: '$_id.translations',
                //         ru: '$_id.ru',
                //         uz: '$_id.uz',
                //         materials: '$materials',
                //     }
                // }
            ]).then((data) => res.json(data));
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err });
        }
    }
    async getAll(req, res) {
        try {
            Proiz.aggregate([
                {
                    $group: {
                        _id: {
                            _id: "$_id",
                            ru: "$ru",
                            uz: "$uz",
                            images: "$images",
                            date: "$date",
                            parametrs: "$parametrs",
                        },
                    },
                },
            ]).then((data) => res.json(data));
        } catch (err) {
            res.status(500).json({ message: "Ошибка сервера", err });
        }
    }
}

module.exports = new ProizController();
