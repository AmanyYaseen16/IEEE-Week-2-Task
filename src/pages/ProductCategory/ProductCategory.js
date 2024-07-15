import React from 'react';
import './ProductCategory.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductSingle, getSingleProductStatus, getProductSingle } from '../../store/ProductSlice';
import { STATUS } from '../../status';
import Loader from '../../components/Loader/Loader' 


export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: "USD"
  }).format(price);
}

const ProductCategory = () => {

  const {id} = useParams();
  console.log(id);

  return (
    <div>ProductCategory</div>
  )
}

export default ProductCategory