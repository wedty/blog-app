
import React, { useContext } from 'react'
import "./topbar.css";
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../../context/Context"


export const Topbar = () => {

    const navigate = useNavigate();
    const {user,dispatch} = useContext(Context);

    const path = "http://localhost:5000/images/"
    
    const handleLogout =()=>{
        dispatch({type:"LOGOUT"});
        navigate("/");
    
    }

  return (
    <>
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <NavLink className="link" to="/">Home</NavLink>

                    </li>
                    <li className="topListItem"><NavLink className="link" to="/about">
                        About
                        </NavLink>
                        </li>
                    <li className="topListItem">
                    <NavLink className="link" to="/contact">
                        Contact
                        </NavLink>
                    </li>
                    <li className="topListItem">
                        <NavLink className="link" to="/create">
                        Write
                        </NavLink>
                    </li>
                    {user && <li className="topListItem" onClick={handleLogout}>Logout</li>}
                    

                </ul>
            </div>

            <div className="topRight">
                {user?(
                    <NavLink className="link" to="/profile">
                        <img src={(user.profilePic==="")?"https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" : path+user.profilePic}alt="" className="topImg" />

                    </NavLink>
                ):(
                    <ul className="topList">
                        <li className="topListItem">
                            <NavLink className="link" to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li className="topListItem">
                            <NavLink className="link" to="/register">
                                Register
                            </NavLink>
                        </li>
                    </ul>
                )}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    </>
  )
}
