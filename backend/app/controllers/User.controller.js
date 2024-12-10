const bcrypt = require('bcryptjs');

const User = require('../models/User.model')

exports.register = async (req, res) => {
    const { HoTen, Email, Password } = req.body;

    if (!HoTen || !Email || !Password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const existingUser = await User.findOne({ Email });

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({ HoTen, Email, Password: hashedPassword });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

exports.login = async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const user = await User.findOne({ Email });
        
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) { 
            res.status(404).send('Không tìm thấy tài khoản');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Lỗi! Không thể lấy tài khoản');
    }
}