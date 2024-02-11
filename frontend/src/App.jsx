import { useState } from "react"; 
import { BrowserRouter , Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup"; 
import Home from "./pages/Home/Home";
import PostComponent from "./components/PostComponent/PostComponent";
import Update from "./components/Update/Update";

function App() {
  return (
    <>
      <BrowserRouter>
         
         <Routes>
             <Route path="/" element={<LoginSignup/>}/> 
             <Route path="/home" element={<Home/>}/>   
             <Route path="/add" element={<PostComponent/>}/>    
             <Route path="/update" element={<Update/>}/>    

         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
