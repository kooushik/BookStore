import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header.js';
import NewProduct from './NewProduct.js';
import ProductList from './ProductList.js';
import './App.css';

function Home() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const fetchProducts = async () =>{
      setIsLoading(true);
      const response =await fetch('http://localhost:5000/api/storeBooks');
      const responseData = await response.json();

      setLoadedProducts(responseData);
      setIsLoading(false);
    };
    fetchProducts();
  },[]);
  

  const addProductHandler = async (productName, productPrice, productImage) => {
    try{

      const newProduct = {
        title: productName,
        price: +productPrice,
        image: productImage
      };
      let hasError = false;
      const response = await fetch('http://localhost:5000/product', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(!response.ok){
        hasError = true;
      }
      const responseData = await response.json();console.log(responseData);
      if(hasError){
        throw new Error(responseData.message);
      } 
      
      setLoadedProducts(prevProducts => {
        return prevProducts.concat({
          ...newProduct,
          id: responseData.products.id
        });
      });
    } catch (error) {
      alert(error.message || 'Something went wrong!')
    };
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/StoreBooks',
      data: {image: productImage, title: productName, price: productPrice} ,
      validateStatus: (status) => {
        return true; 
      },
    }).then(res => res.json())
    .catch(error => {
      console.error('There was an error!', error);
    });
  };
  return (
    <React.Fragment>
      <Header/>
      <main>
        <NewProduct onaddProduct={addProductHandler}/>
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <ProductList items={loadedProducts}/>}  
      </main>
    </React.Fragment>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}
export default Home;

