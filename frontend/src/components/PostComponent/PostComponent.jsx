import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../../redux/Slices/BlogSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function PostComponent() {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, author } = formData;

    console.log(formData);

    if (!title || !description || !author) {
      alert("All fields are mandatory");
    } else {
      const currentPost = {
        id: Date.now(),
        title: title,
        description: description,
        author: author,
      };

      async function addData() {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/blog/createPost",
            currentPost
          );
          console.log(response.data);
          
          dispatch(addBlog(currentPost)); 
        } catch (error) {
          console.log(error);
        }
      }

      addData();

      navigate("/home");
    }
  };

  const handleFormData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center mt-10">
        <div className="w-[800px] border-2 border-gray-700 p-4 rounded-2xl">
          <div className="text-4xl text-center text-[#3c009d] mb-12 font-bold">
            Post You Blog
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="text-xl font-medium mb-1"> Title </div>

              <div>
                <input
                  type="text"
                  placeholder="enter title"
                  name="title"
                  onChange={handleFormData}
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xl font-medium mb-1"> Description </div>

              <div>
                <input
                  type="text"
                  placeholder="enter description"
                  name="description"
                  onChange={handleFormData}
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xl font-medium mb-1"> Author </div>

              <div>
                <input
                  type="text"
                  placeholder="enter author"
                  name="author"
                  onChange={handleFormData}
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                />
              </div>
            </div>

            <input
              type="submit"
              className="w-full bg-[#3c009d] p-2 text-white font-normal rounded-3xl text-xl cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
