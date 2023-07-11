import React from 'react'
import "../css/infobar.css";

const InfoBar = (props)=>{
    return (
        <>
           <div className="container-fluid infobar mb-3">
               <div className="row infobar">
                   <div className="col-md-2 col-2 my-auto mr-5">
                       <div className="onlineIcon"></div>
                   </div>
                   <div className="col-md-8 col-8">
                       <h3>{props.room}</h3>
                   </div>
                   <a href='/' className="col-md-1 col-2 x a text-center my-auto">
                       X
                   </a>
               </div>
           </div>
        </>
    );
};

export default InfoBar;
