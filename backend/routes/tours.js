const express = require('express')
const Tour = require('../models/Tour')
const {verifyAdmin} = require('../utils/verifyToken')
const router = express.Router()

//create new tour

router.post('/',verifyAdmin, async(req,res)=>{
    const newTour = new Tour(req.body);
    try{
        const savedTour = await newTour.save();
        res
            .status(201)
            .json({
                success:true,
                message:'Succesfully created',
                data:savedTour
            });
    }catch(err){
        res
        .status(500)
        .json({success:false,message:"Failed to create. Try again"});
    }
}
);

//update tour
router.put('/:id',verifyAdmin,async(req,res)=>{
    const id=req.params.id
    try{
        const updatedTour=await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(200).json({
            success:true,
            message:'Succesfully updated',
            data:updatedTour
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to update. Try again",
            data:savedTour
        })
    }
})

router.delete('/:id',verifyAdmin,async(req,res)=>{
    const id=req.params.id
    try{
        const deletedTour=await Tour.findByIdAndDelete(id);
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

//get single Tour
router.get('/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const getSingleTour=await Tour.findById(id).populate('reviews');
        res.status(200).json({
            success:true,
            message:'Successful get',
            data:getSingleTour
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"No Data found on this Id"
        })
    }
}) 

//get all Tour
  router.get('/',async(req,res)=>{
    
    //for pagination
    const page=parseInt(req.query.page)
    console.log(page)
    try{
        const tours = await Tour.find({})
        .populate('reviews')
        .skip(page*8)
        .limit(8);
        res.status(200).json({
            success:true,
            count:tours.length,
            message:'Succesfully ',
            data:tours
            })


    }catch(err){
        res.status(404).json({
            success:false,
            message:"No Data found"
            })
    }
})


//get tours by search

router.get('/search/getTourBySearch',async(req,res)=>{
    //here 'i' means case senseitive
    const city = new RegExp(req.query.city,'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try{
        //gte means greater than equal
        const tours = await Tour.find({
           city,
           distance:{$gte:distance},
           maxGroupSize:{$gte:maxGroupSize}
        }).populate('reviews')
        res.status(200).json({
            success:true,
            message:'Succesfully ',
            data:tours
            })     
    }
    
    catch(err){
        res.status(404).json({
            success:false,
            message:"No Data found"
            })
    }


})

//get featured tour

router.get('/search/getFeaturedTours',async(req,res)=>{
    try{
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8);
        res.status(200).json({
            success:true,
            message:'Succesfully ',
            data:tours
            })


    }catch(err){
        res.status(404).json({
            success:false,
            message:"No Data found"
            })
    }
})

//get tour counts
router.get('/search/getTourCount',async(req,res)=>{
    try{
       const tourCount = await Tour.estimatedDocumentCount()
       res.status(200).json({success:true,data:tourCount}) 
    }catch(err){
        res.status(404).json({success:false,message:"Failed to fetch"})
    }
})



module.exports= router;