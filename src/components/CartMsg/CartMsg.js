import React from 'react';
import "./CartMsg.css";
import truebrown from "../../images/truebrown.png";

const CartMsg = () => {
  return (
    <div className='cart-message'>
    <div className='cart-message-icon'>
      <img src = {truebrown} alt = "" />
    </div>
    <h6 className='text-white fs-14 fw-5'>Item added to your shopping cart</h6>
  </div>
  )
}

export default CartMsg