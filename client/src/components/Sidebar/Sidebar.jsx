import React, { useEffect, useState } from 'react'

import axios from "axios";

    import { NavLink } from 'react-router-dom';
    import "./sidebar.css";
export const Sidebar = () => {

    const [cats,setCats] = useState([]);

    useEffect(()=>{
        const getCats = async()=>{
            const res = await axios.get("/categories");
            setCats(res.data);
        }
        getCats();
    },[]);
  return (
    <>
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About Me</span>
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.searchenginejournal.com%2Fbusiness-benefits-of-blogging%2F377747%2F&psig=AOvVaw1w_KCre6W4bseA4dMo11Rw&ust=1686853919747000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNC0nNeyw_8CFQAAAAAdAAAAABAE" alt="" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis consequuntur recusandae ut blanditiis nesciunt ipsam labore inventore temporibus culpa incidunt.

                </p>

            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <ul className="sidebarList">
                    {
                        cats.map((c)=>(
                            <NavLink to={`/?cat=${c.name}`} className="link" key={c._id}>
                                <li className="sidebarListItem" >{c.name}</li>
                            </NavLink>
                        ))
                    }
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    </>
  )
}
