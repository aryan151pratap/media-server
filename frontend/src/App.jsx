import { useState } from "react";
import Api from "./components/api";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Header from "./components/header";
import Home from "./components/home";
import Media from "./components/media";
import Login from "./components/login";
import "./app.css";
import SideBar from "./sideBar";
import UserProfile from "./account";

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

        <div className="h-full w-full flex flex-row overflow-hidden">
  
          <div className={`hidden md:flex shrink-0 transition-all duration-300 ${showSide ? "w-64" : "w-10"}`}>
            <SideBar showSide={showSide} setShowSide={setShowSide} user={user} />
          </div>

          <div className="flex-1 min-w-0 overflow-auto custom-scrollbar flex justify-center">
            <div className={`w-full ${!showSide && "lg:max-w-[80%]"} h-full transition-all duration-500`}>
              {!user ? (
                <Routes>
                  <Route path="*" element={<Login setUser={setUser} />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              ) : (
                <Routes>
                  <Route path="/home" element={<Home user={user} />} />
                  <Route path="/media" element={<Media user={user} />} />
                  <Route path="/api" element={<Api user={user} />} />
                  <Route path="/account" element={<UserProfile user={user} />} />
                  <Route path="*" element={<Home user={user} />} />
                </Routes>
              )}
            </div>
          </div>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;
