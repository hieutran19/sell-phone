const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const generateRememberToken = () => {
    return crypto.randomBytes(64).toString('hex');
}

const login = (req, res) => {
    res.render('admin/login', { data: {} })
}


const postLogin = async (req, res) => {
    const error = "Tài khoản không hợp lệ !"
    const user = await userModel.findOne({ email: req.body.email, provider:"local" });
    
    if (!user)
        return res.render('admin/login', { data: { error } })

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword)
        return res.render('admin/login', { data: { error } })

    req.session.user = user

    if (req.body.remember) {
        // Tạo một mã thông báo và lưu trữ nó trên phía máy khách (như một cookie)
        const rememberToken = generateRememberToken(); // Sử dụng hàm generateRememberToken()
        res.cookie('remember_me', rememberToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }); // Ví dụ: Thiết lập cookie để hết hạn sau 7 ngày
    } else {
        // Xóa mọi mã thông báo ô nhớ hiện có
        res.clearCookie('remember_me');
    }

    res.redirect('/admin/dashboard');
}

const logout = (req, res) => {
    req.session.destroy();
     
    res.redirect('/admin/login');
}

module.exports = {
    login, logout, postLogin, generateRememberToken
}
