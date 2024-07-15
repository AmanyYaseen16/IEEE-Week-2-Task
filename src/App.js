import './App.css';
import {
  BrowserRouter,Routes, Route
} from 'react-router-dom';

//pages 
import Home from './pages/Home/Home';
import AboutProduct from './pages/AboutProduct/AboutProduct';
import Search from './pages/Search/Search';
import ProductCategory from './pages/ProductCategory/ProductCategory';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';

//components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";

import store from './store/store';

import {Provider} from "react-redux";  //which makes the Redux store available to the rest of the app



function App() {
  return (
    <div className='App'> 
      <Provider store={store}> {/* Wrap the app so that the store is available throughout the component tree*/}

        <BrowserRouter>
          <Header />
          <Sidebar />

          <Routes>   {/* Specify the routes for pages */}

            <Route path='/' element = {<Home/>} />
            <Route path='/category/:category' element= {<ProductCategory/>} />
            <Route path='product/:id' element={<AboutProduct/>} />
            <Route path='cart' element={<ShoppingCart />} />
            <Route path='search/:searchTerm' element={<Search />} />

          </Routes>

        </BrowserRouter>

      </Provider>
    </div>
  );
}

export default App;
