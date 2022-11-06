
import './App.css';
import {Product} from './pages/Product.js'
import {CartItem} from './pages/CartItem.js'
import  {Error} from './pages/Error.js'
import axios from 'axios';
import { useState, useEffect } from 'react';



function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [errors, setError] = useState("");

  let listItems = undefined;
  let cartItems = undefined;
  


  const fetchProducts = async() =>{
   
    try {      
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }


  const fetchCart = async() =>{
    try {      
      const response = await axios.get("/api/cart");
      setCart(response.data);
    } catch(error) {
      setError("error retrieving cart: " + error);
    }
  }


  // fetch ticket data
  useEffect(() => {
    
    fetchProducts();
    fetchCart();
  },[]);
  
  listItems = products.map((p, index) => 
    <Product key={p.id} product={p} setError={setError} updateCart={fetchCart}></Product>
  );

  cartItems = cart.map((p, index) => 
    <CartItem key={p.id} item={p} setError={setError} updateCart={fetchCart}></CartItem>
  );
  
  let content = undefined;
  if (errors !== ""){
    content = <Error error={errors}/>;
  } else {
    
    content = (
      <>
          <div  className="product">
            <h1>
              Products
            </h1>
            {listItems}

            <h1>
              Cart
            </h1>
            {cartItems}

          </div>

          </>
    );
  }

  return (
    <div>
      <header>
        {content}
      </header>
    </div>
  );
}

export default App;
