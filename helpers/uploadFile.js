const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'fileuploads');
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});
const filefilter = (req, file, cb) => {
    const filetypes = /txt|docx|doc|xls|pdf/; // filetypes you will accept
    const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
    const extname = filetypes.test(path.extname(file.originalname)); // extract the file extension
    // if mimetype && extname are true, then no error
    if (mimetype && extname) {
        return cb(null, true);
    }
    // if mimetype or extname false, give an error of compatibilty
    return cb("The uploaded file, isn't compatible :( we're sorry");
}

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = { upload }