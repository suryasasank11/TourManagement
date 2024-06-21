const mongoose=require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
        type: String
    },
    userEmail: {
      type: String,
    },
    tourName:{
        type:String,
        required:true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize:{
        type: Number,
        required:true
    },
    phone:{
        type: Number,
        reqired:true
    },
    bookAt:{
        type:Number,
        required:true
    }
  },
  { timestamps: true }
);

module.exports= mongoose.model("Booking", bookingSchema);
