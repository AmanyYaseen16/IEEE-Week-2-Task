import React from 'react';
import './ProductList.css';
import Product from "../Product/Product";

const ProductList = ({products}) => {
    //console.log(products);
  return (
    <div className='product-lists grid'> 
        {
            products.map(product => {
                let discountPrice = (product.price) - (product.price * (product.discountPercentage /100));

                return (
                    <Product key={product.id} product = {{
                        ...product, discountPrice
                    }} />
                )
            })
        }  

    </div>
  )
}

export default ProductList