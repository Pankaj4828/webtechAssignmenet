const express=require("express");
const router=express.Router();
const product=require("../models/Product");
const Category=require("../models/Cateories")


//product crud opeartion and filter ,searching,sorting implemenet here


router.get("/", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let sort = req.query.sort || "price";
		let category = req.query.category || "All";
        let categorylist=await Category.find({});
		

		category === "All"
			? (category = [...categorylist])
			: (category= req.query.category.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const productlist = await product.find({ name: { $regex: search, $options: "i" } })
			.where("category")
			.in([...category])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await product.countDocuments({
			category: { $in: [...category] },
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			category: categorylist,
			productlist 
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});




router.post('/',async (req,res)=>{
try{
    const matchcategory=await Category.findById(req.body.category);
    if(! matchcategory) {return res.status(400).send("invalid category")}  
    
    const newproduct= await product.create(req.body);
    res.send(newproduct)
}catch(e){
    res.send("invalid")
}
    
})


router.delete("/delete/:id",async(req,res) =>{
    const  {name,color}=req.body;
    try {
      const newproduct=await product.findByIdAndRemove(
         req.params.id
      )
      if(newproduct)
      {
        res.json({
            success:true,message:"delete product successfully"
          })
      }else{
        res.json({
            success:false,message:"some error occure"
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
    
    try {
      const newproduct=await product.findByIdAndUpdate(
         req.params.id,(req.body)
      )
     
      res.json({newproduct,
        success:true,message:"update successfully"
      })
    } catch (e) {
      res.json({
        success:false,
          message:"failed to update"
  
      })
    }
  
  })

module.exports=router;