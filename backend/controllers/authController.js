// sign up
const bcrypt = require("bcryptjs");
const User=require("../models/user");
exports.signup =async  (req,res)=>{
    const {name,email,password}=req.body;
      const existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password,10);
     const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();

    res.status(201).json({
        message:"User created successfully"
    });
};



// sign in
const jwt = require("jsonwebtoken");
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }
    // Generate JWT token
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
};
