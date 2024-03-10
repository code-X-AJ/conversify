const User = require('../../models/user.model')
const bcrypt = require('bcrypt')

const httpPostRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) return res.json({ msg: "Username already used", status: false })

        const emailCheck = await User.findOne({ email })
        if (emailCheck) return res.json({ msg: "email already used", status: false })

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashedPassword })
        delete user.password;
        return res.json({ status: true, user })

    } catch (error) {
        next(error)
    }
}

const httpPostLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const oldUser = await User.findOne({ username })
        if (!oldUser)
            return res.json({ msg: "Incorrect username or password", status: false })

        const isPasswordValid = await bcrypt.compare(password, oldUser.password)
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect username or password", status: false })

        delete oldUser.password;
        return res.json({ status: true, oldUser })

    } catch (error) {
        next(error)
    }
}

const httpPostSetAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const imageData = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImgSet: true,
            avatarImage: imageData,
        })
        return res.json({ isSet: userData.isAvatarImgSet, image: userData.avatarImage })
    } catch (error) {
        next(error)
    }
}

const httpGetAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id:{$ne: req.params.id}}).select(['email','username','avatarImage','_id'])
        return res.json(users);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    httpPostRegister,
    httpPostLogin,
    httpPostSetAvatar,
    httpGetAllUsers,
}