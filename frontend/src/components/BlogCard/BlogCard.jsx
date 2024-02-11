import React from "react";
import "./BlogCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setBlog, setId } from "../../redux/Slices/BlogSlice";

function BlogCard({ id, title, description, author }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemove = async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/api/blog/delete/${id}`
    );

    const data = response.data;

    console.log(data);

    dispatch(setBlog(data));
  };

  return (
    <div className="w-[450px] h-[280px] p-4 flex flex-col justify-evenly items-start container">
      <div>
        <span className="text-gray-500"> Title</span> : {title}{" "}
      </div>

      <div>
        <span className="text-gray-500"> Description</span> : {description}
      </div>

      <div>
        <span className=" text-gray-500"> Author</span> : {author}
      </div>

      <div className="w-full bg-gray-400 h-[1px]"></div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => {
            dispatch(setId(id));
            navigate("/update");
          }}
          className="bg-green-500 w-[100px] text-white p-1 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => handleRemove(id)}
          className="bg-red-500 w-[100px] text-white p-1  rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
