const User = require("../models/models")
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");

exports.register= async (req, res) => {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.emailid;
        const password = req.body.password
       
        if (!firstname || !lastname || !email || !password) {
            return res.status(404).send("Some data is missing");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(404).send('User already exists with this email');
        }

        const encryptedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encryptedPassword,
        })

        const token = jwt.sign(
            { id: user._id, email },
            'shhhh',
            {
                expiresIn: "2h",
            }
        )
        user.token = token;
        user.password = undefined;
        return res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
}

