import React from 'react'
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/CategorySlice';




const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  return (
    <div className='holder'>
    <header className="header">
        <Navbar/>
        <div className="header-content flex-c text-center text-white">
          
            <h2 className="header-title
            text-capitalize text-italic"> Shop Smart <h2 style={{marginLeft:100, color:"#704530"}} > Shop With Us </h2>
            </h2> 
            <p className="header-text fs-20 fw-2">
            Where value meets variety
            <i class="fa fa-heart" aria-hidden="true" style={{marginLeft:10, color:"#704530"}}></i>
            </p>

        
          </div>
    </header>
    <ul className='category-nav flex align-center fs-12 fw-4'>
            {
              // taking only first 8 categories
              categories.slice(0, 6).map((category, idx) => (
                <li className='nav-item no-wrap ls-1 fs-12 fw-3' key = {idx}>
                  <Link to = {`category/${category}`} className='nav-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              ))
            }
          </ul>
</div>
  )
}

export default Header