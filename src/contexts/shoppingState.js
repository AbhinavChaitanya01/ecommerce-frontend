import React, { useEffect, useState } from 'react';
import ShoppingContext from './shoppingContext';

const ShoppingState = (props) => {
    const [products, setProducts] = useState([]);
  const url = "https://e-commerce-cyan-nine.vercel.app/api";

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const response = await fetch(`${url}/products/getProducts`, {
          method: "GET",
        });
        const json = await response.json();
        setProducts(json.message);
        console.log(json.message);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    FetchProducts();
  }, []);
    
    return (
        <ShoppingContext.Provider value={{ products }}>
            {props.children}
        </ShoppingContext.Provider>
    );
}

export default ShoppingState;
