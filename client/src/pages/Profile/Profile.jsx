import React, { useContext, useState } from 'react'
import "./profile.css" ;
import {Sidebar} from "../../components/Sidebar/Sidebar";
import axios from "axios";
import {Context} from "../../context/Context";

export const Profile = () => {
const [file, setFile]= useState(null);

const [username,setUsername] =useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [success, setSuccess] = useState(false);

const {user,dispatch} = useContext(Context);

const path = "http://localhost:5000/images/";

const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"});

    const updatedUser= {
        userId:user._id,username,email,password,

    }

    if(file){
        const data = new FormData();
        const filename = Date.now()+file.name;
        data.append("name",filename);

        data.append("file",file);
        updatedUser.profilePic =filename;

        try{
            await axios.post("/upload",data);

        }
        catch(err){}
    }

    try{
        const res = await axios.put("/users/"+user._id,updatedUser);

        setSuccess(true);
        dispatch({type:"UPDATE_SUCCESS",payload:res.data});

    }
    catch(err){
        dispatch({type:"UPDATE_FAILURE"});
    }
}
  return (
    <>
        <div className="profile">
            <div className="profileWrapper">
                <div className="profileTitle">
                    <span className="profileTitleUpdate">
                        Update Your Account
                    </span>
                    <span className="profileTitleDelete">
                        Delete Your Account
                    </span>
                </div>
                <form 
                className="profileForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="profilePP">
                        <img
                        src={file ?URL.createObjectURL(file):(user.profilePic)?path+user.profilePic:"https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                        alt=""
                        />
                        <label htmlFor="fileInput" >
                            <i className="profilePPIcon far fa-user-circle"></i>{" "}
                        </label>

                        <input type="file" id="fileInput" style={{display:"none"}}
                        onChange={(e)=>setFile(e.target.files[0])} />
                    </div>

                    <label >Username</label>

                    <input type="text" name="name"  placeholder={user.username}
                        onChange={(e)=>setUsername(e.target.value)} 
                    />

                    <label>Email</label>
                    <input type="email" name="email" placeholder={user.email}
                    onChange={(e)=>setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password"
                    onChange={(e)=>setPassword(e.target.value)}  />

                    <button type="submit" className="profileSubmitButton">
                        Update
                    </button>

                    {
                        success &&(
                            <span style={{color:"green" ,
                            textAlign:"center",
                            marginTop:"20px"}}>Profile has been updated...</span>
                        )
                    }
                </form>
            </div>

            <Sidebar/>
        </div>
    </>
  )
}
