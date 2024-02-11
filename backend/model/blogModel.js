
const mongoose = require("mongoose") ; 


const blogSchema = new mongoose.Schema({ 
     id: {type : String , required: true} , 
     title : String , 
     description: String , 
     author : String , 
})


const Blog = mongoose.model("Blog" , blogSchema) ; 


module.exports = Blog ; 

