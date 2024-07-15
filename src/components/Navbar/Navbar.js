import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import "./Navbar.css";
import { useSelector, useDispatch } from 'react-redux'; // useSelector is to read data from store
import {setSidebarOn } from '../../store/sidebarSlice';
import { getCategories } from '../../store/CategorySlice';
import { getCarts, getCartItemsCount, getCartTotal } from '../../store/CartSlice';
import CartModal from "../CartModal/CartModal";


const Navbar = () => {

 
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const carts = useSelector(getCarts);
  const itemsCount = useSelector(getCartItemsCount);
  //console.log(categories); 

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts])


  return (
   <nav className='navbar'>
    <div className='container bar-content flex'>
      <div className='brand-and-toggler flex'> 
        <button type='button' className='sidebar-show-btn flex text-brown' onClick={() => dispatch(setSidebarOn())}>
         <span className='text-capitalize fw-5 fs-17 ls-1'> Categories </span>
          <i className='fa fa-angle-right' style={{marginTop:4, marginLeft:3}}> </i>
        </button>
      <Link to="/" className='bar-brand flex'>
        <span className='brand-icon' >
        <i class="fa fa-shopping-bag" style={{marginLeft:22}} aria-hidden="true"></i>
        </span>

        <span className='navbar-brand-txt flex'>
            <span className='fw-7' style={{marginLeft:4}}> LUX </span> <span className = 'fw-5'> ORA </span>
        </span>
      </Link>
    </div>

    <div className='navbar-collapse container'>
      <div className='navbar-search bg-brown'>
        <div className='search-elem flex flex-sb'>
          <input type='text' className='search-control fs-14 ls-1' placeholder='Find your perfect item ...'/>
          <Link to={`search/${searchTerm}`} className='search-btn flex align-center'>
            <i class="fa fa-search" aria-hidden="true"></i>
          </Link>
        </div>
      </div>

    </div>
            <div className='navbar-cons'>
              <ul className='navbar-icons flex'>
                <li>
                  <span>                 
                    <i class="fa fa-user" aria-hidden="true"></i> </span>
                    <span className='title'> Profile </span>
                </li>
                  
                  <li>
                    <span> <i class="fa fa-heart" aria-hidden="true" > </i> </span>
                  <span className='title'>Favourites</span>
                  </li>
                 
                    <div className='navbar-cart flex'>
                      <Link to = "/cart" className='cart-btn'>
                      <li>
                        <span>
                      <i className='fa-solid fa-cart-shopping'></i> </span>
                      <span className='title'> Cart </span>
                      </li>
                        <div className='cart-items-value'>{itemsCount}</div>
                        <CartModal carts = {carts}/>
                      </Link>
                    </div>
              </ul>
            </div> 
    </div>
   </nav>
  )
}
export default Navbar