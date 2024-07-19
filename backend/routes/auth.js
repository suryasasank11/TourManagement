const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const router = express.Router()

router.post('/register',async (req,res)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            photo: req.body.photo,
        })

        await newUser.save();
        res.status(200).json({
            success:true,
            message:'User registered successfully'
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to create. Try Again'
            })
    }

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        // Compare the password
        const checkCorrectPassword = await bcrypt.compare(password, user.password);
        if (!checkCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }

        const { password: userPassword, role, ...rest } = user._doc;

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        // Set token in the browser cookies and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production
            sameSite: 'Strict', // CSRF protection
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Set cookie expiration to match token expiration (15 days)
        });
        
        res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            token,
            data: { ...rest },
            role,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false,
            message: 'Login failed. Please try again.',
        });
    }
})

module.exports = router
