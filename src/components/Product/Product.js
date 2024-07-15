import React from 'react';
import { Link } from 'react-router-dom';
import "./Product.css";


const Product = ({product}) => {
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(price);
}
    //console.log(product);
  return (
    <Link to = {`/product/${product?.id}`} key={product?.id}>
        <div className='product-item'>
            <div className='category'>{product?.category}</div>
            <div className='pr-item-img'>
                <img className='pr-cover' src={product?.images[0]} alt={product.title}/>
            </div>
            <div className='pr-item-info fs-14'>
                <div className='brand'>
                    <span style={{fontWeight:600}}>Brand: </span>
                    <span className='fw-4'>{product?.brand || 'Unknown Brand'}</span>
                </div>
                <div className='title'>
            {product?.title}
          </div>
          <div className='price flex'>

            <span className='new-price'>
              {formatPrice(product?.discountPrice)}
            </span>

            <span className='old-price'>
              {formatPrice(product?.price)}
            </span>
          
            <span className='discount fw-6'>
              ({product?.discountPercentage}% Off)
            </span>
          </div>
            </div>
        </div>
    </Link>
  )
}

export default Product