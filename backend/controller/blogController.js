const Blog = require("../model/blogModel");

const getAllBlogs = async (req, res) => {

  const blog = await Blog.find(); 


  return res.json(blog);
};

const createNewBlog = async (req, res) => {
  const { id, title, description, author } = req.body;

  const newBlog = new Blog({
    id: id,
    title: title,
    description: description,
    author: author,
  });

  const data = await newBlog.save();

  return res.json(data);
};

const updateABlog = async (req, res) => {
  const id = +req.params.id;

  const { title, description, author } = req.body;  

  const blog = await Blog.find({id: id}) ; 
    
  await Blog.updateOne(
      { id: id },
      { $set: { title: title || blog.title, description: description || blog.description, author: author || blog.author } }
    );
    const result = await Blog.find({});
    return res.json(result);

};

const deleteBlog = async (req, res) => {
  const id = +req.params.id;

  await Blog.deleteOne({ id: id });

  const result = await Blog.find({});

  return res.json(result);
};



module.exports = { getAllBlogs, updateABlog, deleteBlog, createNewBlog };
