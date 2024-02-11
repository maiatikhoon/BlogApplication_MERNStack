import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";
import axios from "axios";
import { setBlog } from "../../redux/Slices/BlogSlice";
import { useSelector , useDispatch } from "react-redux";

function Home() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch() ; 

  const getBlogsFromDB = async () => {
    const response = await axios.get(`http://localhost:3000/api/blog/`);

    const data = response.data;

    dispatch(setBlog(data)) ;
    console.log("Home >>>>>>>>>>>"); 
    console.log("data from db" , data) ; 
  };

  const blogs = useSelector((state) => state.blog.blog);

  useEffect(() => {
    getBlogsFromDB();
  }, []);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Navbar />

      <div className="flex flex-col justify-center items-center mt-10">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="mb-10" key={blog.id}>
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                author={blog.author}
              />
            </div>
          ))
        ) : (
          <div
            className="text-blue-700 cursor-pointer"
            onClick={() => navigate("/add")}
          >
            {" "}
            Click here to add post{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
