import React, { useContext, useState } from 'react'
import "./createpost.css" ;
import {Context} from "../../context/Context"
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const CreatePost = () => {

  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [file,setFile] = useState(null);
const navigate = useNavigate();
  const {user} = useContext(Context);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const newPost = {username:user.username,
    title,desc};

    if(file){
      const data = new FormData();

      const filename = Date.now()+file.name;

      data.append("name",filename);
      data.append("file",file);

      newPost.photo =filename;

      try{
        await axios.post("/upload",data);

      }catch(err){}
    }

    try{
      const res = await axios.post("/posts",newPost);

      navigate(`/post/${res.data._id}`);
    }
    catch(err){}
  }
  return (
    <>
      <div className="create">

        {
          file &&(
            <img src={URL.createObjectURL(file)} alt="" className="createImg" />

          )
        }
        <form  className="createForm" onSubmit={handleSubmit}>
          <div className="createFormGroup">
            <label htmlFor="createInput">
              <i className="createIcon fas fa-plus"></i>

            </label>
            <input type="file" name="" id="createInput" 
              style={{display:"none"}}

              onChange={(e)=>setFile(e.target.files[0])}

            />

            <input type="text"  className="createInput" 
                        placeholder='Title'
                        autoFocus={true}

                        onChange={(e)=>setTitle(e.target.value)}
            />
          </div>

          <div className="writeFormGroup">
            <textarea             className="createInput createText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}

              onChange={(e)=>setDesc(e.target.value)}
            ></textarea>

          
          </div>
          <button type="submit" className="createSubmit">Publish</button>
          
        </form>
      </div>
    </>
  )
}
