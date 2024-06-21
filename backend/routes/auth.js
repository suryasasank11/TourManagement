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


router.post('/login',async (req,res)=>{
    
    const email = req.body.email
    
    try{
        const user= await User.findOne({email})
        //if user doesnt exist
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not found'
                })
        }
       
        //if user exists then check the password or comapre the password
        const checkCorrectPassword= await bcrypt.compare(req.body.password,user.password)
         console.log( bcrypt.compareSync(req.body.password,user.password));
             
        if(!checkCorrectPassword){
            return res.status(400).json({
                success:false,
                message:'Incorrect email or password'
            })
        }

        const {password, role, ...rest} = user._doc

        //create jwt token
        const token = jwt.sign(
            {id:user._id,role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn : "15d"}
        )

        //set token in the browser cookies and send the response to the client
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({
            success:true,
            message:'successfully login',
            token,
            data:{...rest},
            role
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:'Incorrect email or password'
        })
    }
})


module.exports = router
