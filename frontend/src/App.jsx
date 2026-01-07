import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./app.css";
import MediaServerLanding from "./landing";
import Dashboard from "./dashboard";
import Login from "./components/login";

const App = function () {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Dashboard user={user} setUser={setUser}/>
      {!user &&
      <Routes>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
      </Routes>      
      }
    </BrowserRouter>
  );
};

export default App;
