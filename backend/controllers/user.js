const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ error }));
};

exports.register = (req, res) => {
    let { email, password } = req.body;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) throw err;
        password = hash;

        const newUser = new User({
            email,
            password,
        });

        newUser
            .save()
            .then((response) => res.status(201).json(response))
            .catch((error) => res.status(400).json({ error }));
    });
};

exports.login = (req, res) => {
    let { email, password } = req.body;

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({ error: "Login failed" });
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) throw err;
                if (result) {
                    res.status(200).json({
                        message: "Login successful",
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "1h" }
                        ),
                    });
                } else {
                    res.status(401).json({ message: "Login failed" });
                }
            });
        }
    });
};
