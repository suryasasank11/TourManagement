const express = require('express')
const User = require('../models/User')

const router = express.Router()
const {VerifyToken,verifyUser,verifyAdmin}=require('../utils/verifyToken')
//update User
router.put('/:id',verifyUser,async(req,res)=>{
    const id=req.params.id
    try{
        const updatedUser=await User.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(200).json({
            success:true,
            message:'Succesfully updated',
            data:updatedUser
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to update. Try again",
            data:savedUser
        })
    }
})

router.delete('/:id',verifyUser,async(req,res)=>{
    const id=req.params.id
    try{
        const deletedUser=await User.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:'Succesfully deleted'
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to delete. Try again"
        })
    }
})

//get single User
router.get('/:id',verifyUser,async(req,res)=>{
    const id=req.params.id
    try{
        const getSingleUser=await User.findById(id);
        res.status(200).json({
            success:true,
            message:'Succesfully deleted',
            data:getSingleUser
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"No Data found on this Id"
        })
    }
}) 

//get all User
  router.get('/',verifyAdmin,async(req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).json({
            success:true,
            message:'Succesfully ',
            data:users
            })


    }catch(err){
        res.status(404).json({
            success:false,
            message:"No Data found"
            })
    }
})

module.exports = router