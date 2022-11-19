
const express=require("express");
const Category=require("../models/Cateories")
const { route } = require("./users");
const router=express.Router();


router.get('/',async(req,res)=>{
    const categorylist=await Category.find();
    if(!categorylist)
    {
        res.status(500).json({ success: false})
    }
    res.send(categorylist);
})
router.get('/:id',async(req,res)=>{
    const categorylist=await Category.findById(req.params.id);
    if(!categorylist)
    {
        res.status(500).json({ message:"The categories with the given id was not found"})
    }
    res.send(categorylist);
})

router.post("/create",async(req,res) =>{
  const  {name,color}=req.body;
  try {
    const newcategory=await Category.create({
       name: name,
       color: color
    })
    res.send(newcategory)
  } catch (e) {
    res.json({
        message:"failed to add"

    })
  }

})
router.delete("/delete/:id",async(req,res) =>{
    const  {name,color}=req.body;
    try {
      const newcategory=await Category.findByIdAndRemove(
         req.params.id
      )
      if(newcategory)
      {
        res.json({
            success:true,message:"delete category successfully"
          })
      }else{
        res.json({
            success:false,message:"not found category"
          })
      }
      
    } catch (e) {
      res.json({
        success:false,
          message:"failed to delete"
  
      })
    }
  
  })
  router.put("/update/:id",async(req,res) =>{
    const  {name,color}=req.body;
    try {
      const newcategory=await Category.findByIdAndUpdate(
         req.params.id,(req.body)
      )
     
      res.json({newcategory,
        success:true,message:"update successfully"
      })
    } catch (e) {
      res.json({
        success:false,
          message:"failed to delete"
  
      })
    }
  
  })
module.exports=router;