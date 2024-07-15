import React, { useEffect, useState } from 'react'
import './AboutProduct.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductSingle, getSingleProductStatus, getProductSingle } from '../../store/ProductSlice';
import { STATUS } from '../../status';
import Loader from '../../components/Loader/Loader' 
import { addToCart, getCartMsgStatus, setCartMsgOff, setCartMsgOn, getCartTotal } from '../../store/CartSlice';
import CartMsg from "../../components/CartMsg/CartMsg";




const AboutProduct = () => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(price);
  }
  
  const {id} = useParams();
  //console.log(id);
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);

  const [quantity ,setQuantity] = useState(1);
  const CartMsgStatus = useSelector(getCartMsgStatus); 

  useEffect(() => {
    dispatch(fetchProductSingle(id));

    if(CartMsgStatus) {
      setTimeout(() => {
        dispatch(setCartMsgOff());
      }, 3000)
    }
  }, [CartMsgStatus, id, dispatch]);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [dispatch, product]);

  let discountPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
  if(productSingleStatus === STATUS.LOADING) {
    return <Loader />
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if(tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    })
  }

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if(tempQty < 1) tempQty = 1;
      return tempQty;
    })
  }


  const addToCartHandler = (product) => {
    let discountPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
    let totalPrice = quantity * discountPrice;

    dispatch(addToCart({...product, quantity, totalPrice, discountPrice}));
    dispatch(setCartMsgOn(true));
  }

  return (
    <main className='main-form'>
      <div className='single-product'>
        <div className='container'>
          <div className='single-product-content grid bg-white'>
            <div className='single-product-l'>
              <div className='product-img'>
                <div className='product-img-zoom'>
                  <img src={product ? (product.images ? product.images[0] : "") : ""} alt="" className='product-cover' />
                </div>
                <div className='product-img-thumbs flex align-center my-2'>
                  <div className='thumb-item'>
                    <img src={product ? (product.images ? product.images[1] : "") : ""} alt="" className='img-cover' />
                  </div>
                  <div className='thumb-item'>
                    <img src={product ? (product.images ? product.images[2] : "") : ""} alt="" className='img-cover' />
                  </div>
                  <div className='thumb-item'>
                    <img src={product ? (product.images ? product.images[3] : "") : ""} alt="" className='img-cover' />
                  </div>
                </div>
              </div>
            </div>
            <div className='single-product-r'>
              <div className='product-details'>
                <div className='title fs-20 fw-5'>{product?.title}</div>
                <div>
                  <p className='parag fw-3 fs-15'>{product?.description}</p>
                </div>
                <div className='info flex align-center flex-wrap fs-14'>
                  <div className='rating'>
                    <span className='text-brown-heavy fw-6'>Rating : </span>
                    <span className='mx-1'>{product?.rating}</span>
                  </div>
                  <div className='vertical-line'></div>
                  <div className='brand'>
                    <span className='text-brown-heavy fw-6'>Brand : </span>
                    <span className='mx-1'>{product?.brand}</span>
                  </div>
                  <div className='vertical-line'></div>
                  <div className='brand'>
                    <span className='text-brown-heavy fw-6'>Category : </span>
                    <span className='mx-1 text-capitalize'>{product?.category ? product.category.replace("-", " ") : ""}</span>
                  </div>
                </div>
                <div className='price'>
                  <div className='flex align-center'>
                    <div className='old-price text-gray'>{formatPrice(product?.price)}</div>
                    <span className='fs-14 mx-2 text-black'>Inclusive of all taxes</span>
                  </div>
                  <div className='flex align-center my-1'>
                    <div className='new-price fw-5 fs-24 text-brown-heavy'>{formatPrice(discountPrice)}</div>
                    <div className='discount fs-13 text-white fw-6'>{product?.discountPercentage}% OFF</div>
                  </div>
                </div>
                <div className='qty flex align-center my-4'>
                  <div className='qty-text fw-5'>Quantity : </div>
                  <div className='qty-change flex align-center mx-3'>
                    <button type='button' className='qty-decrease flex align-center flex-c'
                    onClick={() => decreaseQty()}>
                      <i className='fas fa-minus'></i>
                    </button>
                    <div className='qty-value flex align-center flex-c'>{quantity}</div>
                    <button type='button' className='qty-increase flex align-center flex-c'
                    onClick={() => increaseQty()}>
                      <i className='fas fa-plus'></i>
                    </button>
                  </div>
                  {product?.stock === 0 ? <div className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>Out of stock</div> : ""}
                </div>
                <div className='btns'>
                  <button type='button' className='add-to-cart-btn btn'>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='btn-text mx-2' onClick={() => {addToCartHandler(product)}}>Add to cart</span>
                  </button>
                  <button type='button' className='buy-now btn mx-3'>
                    <span className='btn-text'>Buy now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {CartMsgStatus && <CartMsg />}
    </main>
  );
};

export default AboutProduct;