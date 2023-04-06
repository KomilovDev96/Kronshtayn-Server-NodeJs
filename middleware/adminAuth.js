const User = require('../models/User')

const authAdmin = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user.id)
        if(user.role !== "admin"){
            return res.status(400).json({message: "Доступ к административным ресурсам запрещен"})
        }
        next()
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message})
    }
}


module.exports = authAdmin