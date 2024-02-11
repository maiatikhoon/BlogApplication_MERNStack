
const express = require("express") ; 

const router = express.Router() ;  

const { getAllBlogs , updateABlog , deleteBlog , createNewBlog} = require("../controller/blogController") ; 

router.get("/" , getAllBlogs) ; 
router.post("/createPost" , createNewBlog) ; 
router.patch("/update/:id" , updateABlog) ;  
router.delete("/delete/:id" , deleteBlog) ; 


module.exports = router ; 

