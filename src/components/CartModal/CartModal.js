import React from 'react';
import "./CartModal.css";
import shopcart from '../../images/shopcart.jpg';


const CartModal = ({carts}) => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: "USD"
        }).format(price);
    }
  return (
    <div className='cart-modal'>
      <h5 className='cart-modal-title fw-5 fs-15 text-center'>Recenlty Added Products</h5>
      {
        (carts?.length > 0) ? (
          <div className='cart-modal-list grid'>
            {
              carts.map(cart => {
                return (
                  <div className='cart-modal-item grid align-center py-2' key = {cart.id}>
                    <div className='cart-modal-item-img'>
                      <img src = {cart?.thumbnail} alt = "" className='img-cover' />
                    </div>
                    <div className='cart-modal-item-title fs-13 text-capitalize'>{cart?.title}</div>
                    <div className='cart-modal-item-price text-black fs-14 fw-6'>
                      {formatPrice(cart?.discountPrice)}
                    </div>
                  </div>
                )
              })
            }

            <div className='text-capitalize view-cart-btn bg-brown fs-15 text-center'>view my shopping cart</div>
          </div>) : (
          <div className = "flex flex-column align-center flex-c cart-modal-empty">
            <img src = {shopcart} alt = "" className='' />
            <h6 className='text-black fw-4'>No products yet</h6>
          </div>
        )
      }
    </div>
  )
}

export default CartModal
