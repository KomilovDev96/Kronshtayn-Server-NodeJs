const Materials = require("../models/Materials");
const fs = require('fs')
class MaterialController {
    async create(req, res) {
        try {
            const { settings, proizId } = req.body;
            console.log(req.body);
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
}


module.exports = new MaterialController()