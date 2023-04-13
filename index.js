const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./helpers/db')();
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'ru',
        backend: {
            loadPath: './locales/{{lng}}/translation.json'
        }
    })

// Router imports
const authRouter = require('./routes/auth.route');
const proizRouter = require('./routes/proiz.route');
const uslugiRouter = require('./routes/uslugi.route');
const newsRouter = require('./routes/news.route');
const contactRouter = require('./routes/contact.route');
const materialRouter = require('./routes/material.route');
const sertificateRouter = require('./routes/sertificate.route');
const portfolioteRouter = require('./routes/portfolio.route');

const app = express()




app.use(middleware.handle(i18next));

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('static'))
app.use('/imagesuploads', express.static(path.join(__dirname, 'imagesuploads')));
app.use('/fileuploads', express.static(path.join(__dirname, 'fileuploads')));

//Router
app.use("/api/auth", authRouter)
app.use("/api/proiz", proizRouter)
app.use("/api/uslugi", uslugiRouter)
app.use("/api/news", newsRouter)
app.use("/api/contact", contactRouter)
app.use("/api/material", materialRouter)
app.use("/api/sertificate", sertificateRouter)
app.use("/api/port", portfolioteRouter)

const PORT = process.env.PORT || "3000"
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Portimiz ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


