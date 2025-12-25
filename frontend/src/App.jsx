import { useState } from "react";
import Api from "./components/api";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Header from "./components/header";
import Home from "./components/home";
import Media from "./components/media";
import Login from "./components/login";
import "./app.css";
import SideBar from "./sideBar";

const App = function () {
  const [user, setUser] = useState(null);
  const [signup, setSignup] = useState(false);
  const [showSide, setShowSide] = useState(false);
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col w-full bg-zinc-900 text-white">
        <div className="sticky top-0 z-50 bg-zinc-900 w-full">
          <Header user={user} setSignup={setSignup}/>
        </div>
        <div className="h-full w-full flex flex-row justify-center md:justify-normal overflow-auto custom-scrollbar">
          <div className="hidden md:flex w-fit sticky top-0">
            <SideBar showSide={showSide} setShowSide={setShowSide} user={user}/>
          </div>
          
         <div className="w-full flex justify-center">
           <div className={`${showSide ? "w-full" : "lg:w-[70%]"} w-full h-full`}>
            {!user ?
              <Routes>
                <Route path="*" element={<Login setUser={setUser}/>} />
                <Route path="/home" element={<Home />} />
              </Routes>
              :
              <Routes>
                <Route path="/home" element={<Home user={user}/>} />
                <Route path="/media" element={<Media user={user}/>} />
                <Route path="/api" element={<Api user={user}/>} />
                <Route path="*" element={<Home user={user}/>} />
              </Routes>
            }
            </div>
         </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
