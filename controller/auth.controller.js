const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthController {
    async login(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json({ message: `${login} топилмади!` });
            }
            const isPassVal = bcrypt.compareSync(password, user.password);
            if (!isPassVal) {
                return res.status(400).json({ message: `Пароль нотогри!` });
            }
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: "24h",
            });
            return res.json({
                token,
                user: {
                    id: user.id,
                    login: user.login,
                    role: user.role
                },
                message: { message: req.t("user_create_success") }
            });
        } catch (err) {
            return res.status(500).json({ message: "Server Error", code: err, status: 500 })
        }
    }
    async register(req, res) {
        try {
            const hassPassword = await bcrypt.hash("adminadmin", 8);
            const user = await new User({ login: "admin", password: hassPassword, role: "admin" });
            const newUser = await user.save();
            if (newUser) {
                return res.json({ message: "Пользователь был создан" });
            } else {
                return res.json({ message: "Ошибка гдето!" });
            }
        } catch (err) {
            res.send({ message: "Ошибка Сервера в auth" });
        }
    }
    async auth(req, res) {
        try {
            const user = await User.findById(req.user.id)
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
            return res.json({
                token,
                user: {
                    id: user.id,
                    login: user.login,
                }
            })
        } catch (err) {
            console.log(err);
            res.send({ message: "Server error" })
        }
    }
}


module.exports = new AuthController()