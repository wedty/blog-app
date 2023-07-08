
import {Topbar} from "./components/Topbar/Topbar";

import {HomePage} from "./pages/Homepage/HomePage";
import {CreatePost} from "./pages/CreatePost/CreatePost";

import {Login} from "./pages/Login/Login";
import {Register} from "./pages/Register/Register";

import {Single} from "./pages/Single/Single";
import {Profile} from "./pages/Profile/Profile";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";


function App() {
const {user} = useContext(Context);


return(
  <>
    <Router>
      <Topbar/>

      <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/register" element={user?<HomePage/>:<Register/>}/>
          <Route exact path="/login" element={user?<HomePage/>:<Login/>}/>

          <Route exact path="/post/:id" element={user?<Single/> :<Login/>}/>
          <Route exact path="/create" element={user?<CreatePost/>:<Login/>}/>
          <Route exact path="/profile" element={user?<Profile/>:<Login/>}/>

      </Routes>
    </Router>
  </>
)
}

export default App;
