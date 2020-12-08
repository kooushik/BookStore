import React, { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

const NewProduct = props =>{ 
    const [enteredTitle, setEnteredTitle] = useState(' ');
    const [enteredImage, setEnteredImage] = useState('');
    const [enteredPrice, setEnteredPrice] = useState(0);
    const titleChangeHandler = event =>{
        setEnteredTitle(event.target.value);
    }
    const priceChangeHandler = event =>{
        setEnteredPrice(event.target.value);
    }
    const imageChangeHandler = event =>{
        setEnteredImage(event.target.value);
    }
    const submitProductHandler = event => {
        event.preventDefault();
        props.onaddProduct(enteredTitle, enteredPrice, enteredImage);
    }

    return (
      <section id="new-product">
          <h2>Add a New Book</h2>
          <form onSubmit={submitProductHandler}>
              <Input type="text" label="Book Image URL: " id="image" value={enteredImage} onChange={imageChangeHandler}/>
              <Input type="text" label="Book Name: " id="title" value={enteredTitle} onChange={titleChangeHandler}/>
              <Input type="number" label="Book Price: " step="0.01" id="price" value={enteredPrice} onChange={priceChangeHandler}/>
              <Button type="submit">ADD BOOK</Button>
          </form>

      </section>
      
    );
  }
  
  export default NewProduct;