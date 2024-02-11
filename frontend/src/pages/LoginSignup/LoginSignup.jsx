import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { setUser } from "../../redux/Slices/UserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [action, setAction] = useState("Login");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const addDataToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const loginUser = async (currentUser) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        currentUser
      );

      const { user, token } = response.data;

      addDataToLocalStorage({ user, token });

      if (user) {
        navigate("/home");
      }
    } catch (error) {
      console.log("Error", error);
      setError(error.response.data);
    }
  };

  const registerUser = async (currentUser) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        currentUser
      );

      const { user, token } = response.data;

      addDataToLocalStorage({ user, token });

      if (user) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setUser(formData));

    const { name, email, password, cnf_password } = formData;

    const currentUser = {
      name: name,
      email: email,
      password: password,
      cnf_password: cnf_password,
    };

    if (action === "Login") {
      if (!password || !email) {
        setError("enter all details!");
      } else {
        loginUser(currentUser);
      }
    } else {
      if (!name || !email || !password || !cnf_password) {
        setError("all fields are mandatory !");
      } else if (password !== cnf_password) {
        setError("passwords doesn't match! ");
      } else {
        registerUser(currentUser);
      }
    }
  };

  const handleFormData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen h-screen bg-[#3c009d] flex flex-col justify-center items-center ">
      <div className="bg-white p-4 font-medium mb-10 text-2xl">
        <h1> Please login to read blogs !</h1>
      </div>

      <div className="w-[450px] h-[500px] p-4 bg-white flex flex-col justify-start items-center rounded-sm">
        {action === "Login" ? (
          <div className="text-4xl font-semibold ">Login</div>
        ) : (
          <div className="text-4xl font-semibold ">Register</div>
        )}

        <div className="bg-[#3c009d] w-[60px] h-[4px] rounded-full mt-5"></div>

        <form onSubmit={handleSubmit}>
          {error ? (
            <div className="mt-4 text-red-500"> {error} </div>
          ) : (
            <div> </div>
          )}

          <div className="mt-10">
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="flex bg-gray-300 w-[250px] p-3 items-center mb-1">
                <FaUser className="text-slate-800" />
                <input
                  type="text"
                  name="name"
                  placeholder="enter name"
                  onChange={handleFormData}
                  className="bg-gray-300 outline-none ml-2"
                />
              </div>
            )}

            <div className="flex bg-gray-300 w-[250px] p-3  items-center mb-1">
              <MdEmail className="text-slate-800" />
              <input
                type="text"
                name="email"
                placeholder="enter email"
                onChange={handleFormData}
                className="bg-gray-300 outline-none ml-2"
              />
            </div>

            <div className="flex bg-gray-300 w-[250px] p-3  items-center mb-1">
              <FaLock className="text-slate-800" />
              <input
                type="password"
                name="password"
                placeholder="enter password"
                onChange={handleFormData}
                className="bg-gray-300 outline-none ml-2"
              />
            </div>

            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="flex bg-gray-300 w-[250px] p-3  items-center mb-1">
                <FaLock className="text-slate-800" />
                <input
                  type="password"
                  name="cnf_password"
                  placeholder="confirm password"
                  onChange={handleFormData}
                  className="bg-gray-300 outline-none ml-2"
                />
              </div>
            )}

            <div className="flex items-center justify-center ">
              <input
                type="submit"
                className="bg-[#3c009d] w-[250px] p-2 text-white rounded-sm cursor-pointer"
              />
            </div>

            <div className="mt-2">
              {action === "Login" ? (
                <p>
                  Don't have an account!
                  <span
                    onClick={() => setAction("Register")}
                    className="cursor-pointer text-blue-700 underline ml-1"
                  >
                    register
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account
                  <span
                    onClick={() => setAction("Login")}
                    className="cursor-pointer text-blue-700 underline ml-1"
                  >
                    login
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
