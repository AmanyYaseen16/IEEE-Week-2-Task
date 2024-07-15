import React, { useEffect } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchCategories, getCategories } from '../../store/CategorySlice';


const Sidebar = () => {

  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);  
  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  
  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
         <button type = "button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times-circle'></i>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-4 ls-1h'>All Categories</div>
        <ul className='ct-list flex-column'>
          {
            categories.map((category, idx) => {
              return (
                <li key={idx} onClick = {() => dispatch(setSidebarOff())}>
                  <Link to= {`category/${category}`} className='ct-list-link ls-1 text-capitalize'> {category.replace("-", " ")}</Link>
                </li>
            )
          })
          }
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar