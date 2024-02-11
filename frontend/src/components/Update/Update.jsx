import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/Slices/BlogSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Update() {
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog.blog);
  const id = useSelector((state) => state.blog.id);

  const data = useSelector((state) => state.blog.data);

  const navigate = useNavigate();

  useEffect(() => {
    const particularData = blog.find((b) => b.id === id);

    console.log("update >>>>>>>>>>");

    console.log("from update", particularData);
    dispatch(setData(particularData));
  }, []);

  const updataDataIntoDb = async (data) => {
    const response = await axios.patch(
      `http://localhost:3000/api/blog/update/${id}`,
      data
    );

    const result = response.data;

    console.log(">>>>>>>", result);

    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("from submit of update", data);

    updataDataIntoDb(data);
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;

    dispatch(setData({ ...data, [name]: value }));
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
                  name="title"
                  value={data.title}
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
                  name="description"
                  value={data.description}
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
                  name="author"
                  value={data.author}
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

export default Update;
