import React from 'react'
import "./Loader.css";
import loading from "../../images/loading.svg";

const Loader = () => {
  return (
    <div className='container'>
        <div className='loader flex'>
            <img src={loading} alt=''/>
        </div>
    </div>
  )
}

export default Loader