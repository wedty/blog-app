import React from 'react'
import {NavLink} from "react-router-dom";

import "./post.css";

// import { NavLink } from 'react-router-dom';
export const Post = ({post}) => {

    const path ="http://localhost:5000/images/";

  return (
    <>
        <div className="post">
            { <img src={post.photo?path+post.photo:
            "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            } className="postImg" alt="" />
         } 
              <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                    <NavLink to={`/post/${post._id}`} className="link">
                <span className="postTitle">                            {post.title}        </span>
                    </NavLink>
                <hr />

                <span className="postDate">{new Date(post.createdAt).toString()}</span>

            </div>
            <p className="postDesc">{post.desc}
            </p>
        </div>
    </>
  )
}
