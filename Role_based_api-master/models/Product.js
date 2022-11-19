const mongoose = require("mongoose");



const product=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"category",
      required:true
    },
    price:{
        type:Number,
        default:0
    },
    img:{
        type:String,   
    },
    brandname:{
        type:String,
        default:""
    },
    countInStock:{
        type:Number,
        // required:true,
        min:0,
        max:255
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("newproduct",product);

