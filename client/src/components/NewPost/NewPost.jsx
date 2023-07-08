import React, { useContext, useEffect, useState } from 'react'
import "./newpost.css";
import {useNavigate,NavLink, useParams} from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export const NewPost = () => {
    const [post,setPost] = useState({});

    const path ="http://localhost:5000/images/";

    const {user} = useContext(Context);
const {id}= useParams();
    const [title, setTitle]  = useState("");
    const [desc, setDesc]  = useState("");
    const [updateMode, setUpdateMode]  = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const getPost =async()=>{
            const res = await axios.get("/posts/"+id);

            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };

        getPost();
    },[id]);

    const handleDelete = async()=>{
        try{
            await axios.delete(`/posts/${post._id}`,{
                data:{username:user.username},
            });
            navigate("/");
        }
        catch(err){}
    };


    const handleUpdate = async()=>{
        try{
            await axios.put(`/posts/${post._id}`,{
                username:user.username,
                title,desc
            });

            setUpdateMode(false);

        }catch(err){}
    }
  return (
    <>
          <div className="singlePost">
      <div className="singlePostWrapper">
    
          <img src={post.photo?path + post.photo:"https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="" className="singlePostImg" />
        
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <NavLink to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </NavLink>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  
    </>
  )
}
