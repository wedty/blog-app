import React from 'react'
import "./single.css" ;
import {NewPost} from "../../components/NewPost/NewPost";
import {Sidebar} from "../../components/Sidebar/Sidebar";

export const Single = () => {
  return (
    <>
        <div className="single">
            <NewPost/>
            <Sidebar/>
        </div>
    </>
  )
}
