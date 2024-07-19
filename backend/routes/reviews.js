
const express=require('express')
const Tour=require('../models/Tour.js')
const Review=require('../models/Review.js')
const {verifyUser} =require('../utils/verifyToken.js')
const router=express.Router()

router.post('/:tourId',verifyUser,async (req,res)=>{
    const tourId = req.params.tourId
    const newReview=new Review({...req.body})

    try{
        const savedReview = await newReview.save()
        //after creating a new review now update the revirews array of the tou
        await Tour.findByIdAndUpdate(tourId,
            {$push:{reviews:savedReview.id}},
        )
        res.status(200)
            .json({success: true,message:'Review submitted',data:savedReview});   
    }catch(err){
        res.status(500).json({success:false,message:'failed to submit'});
    }
})

module.exports=router
