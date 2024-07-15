import React , {useEffect} from 'react'
import "./ShoppingCart.css";
import { useSelector, useDispatch } from 'react-redux';
import shopcart from '../../images/shopcart.jpg';
import { Link } from 'react-router-dom';
import { getCarts, removeFromCart, toggleCartQty, clearCart, getCartTotal } from '../../store/CartSlice';




const ShoppingCart = () => {

  const dispatch = useDispatch();
  const carts = useSelector(getCarts);
  const { itemsCount, totalAmount} = useSelector((state) => state.cart);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(price);
  }

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts, dispatch]);

  if(carts.length === 0) {
    return (
    <div className='container my-5'>
    <div className='empty-cart flex flex-c align-center flex-column'>
      <img src = {shopcart} alt = "" />
      <span className='fw-6 fs-15 text-black'>Your shopping cart is empty!</span>
      <Link to = "/" className='shopping-btn bg-brown text-black fw-5'>Go shopping Now</Link>
    </div>
  </div>
    )
  }

  return (
    <div className='cart'>
      <div className='container'>
        <div className='cart-ctable'>
          <div className='cart-chead bg-brown'>
            <div className='cart-ctr fw-6 fs-15'>
              <div className='cart-cth'>
                <span className='cart-ctxt'>S.N.</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Product</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Unit Price</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Quantity</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Total Price</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Actions</span>
              </div>
            </div>
          </div>

          <div className='cart-cbody bg-white'>
            {
              carts.map((cart, idx) => {
                return (
                  <div className='cart-ctr py-4' key = {cart?.id}>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{idx + 1}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{cart?.title}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{formatPrice(cart?.discountPrice)}</span>
                    </div>
                    <div className='cart-ctd'>
                      <div className='qty-change flex align-center'>
                        <button type = "button" className='qty-decrease flex align-center flex-c' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "DEC"}))}>
                          <i className='fas fa-minus'></i>
                        </button>

                        <div className='qty-value flex align-center flex-c'>
                          {cart?.quantity}
                        </div>

                        <button type = "button" className='qty-increase flex align-center flex-c' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "INC"}))}>
                          <i className='fas fa-plus'></i>
                        </button>
                      </div>
                    </div>

                    <div className='cart-ctd'>
                      <span className='cart-ctxt text-brown fw-5'>{formatPrice(cart?.totalPrice)}</span>
                    </div>

                    <div className='cart-ctd'>
                      <button type = "button" className='delete-btn text-black' onClick={() => dispatch(removeFromCart(cart?.id))}>Delete</button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className='cart-cfoot flex align-start flex-sb py-3 bg-white'>
            <div className='cart-cfoot-l'>
              <button type='button' className='clear-cart-btn text-brown fs-15 text-uppercase fw-4' onClick={() => dispatch(clearCart())}>
                <i className='fas fa-trash'></i>
                <span className='mx-1 text-capitalize' style={{marginLeft:9}}>Clear Cart</span>
              </button>
            </div>

            <div className='cart-cfoot-r flex flex-column justify-end'>
              <div className='total-txt flex align-center justify-end'>
                <div className='font-manrope fw-5'>Total ({itemsCount}) items: </div>
                <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalAmount)}</span>
              </div>

              <button type = "button" className='checkout-btn text-white bg-brown fs-16'>Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart