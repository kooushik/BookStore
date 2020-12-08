import React from 'react';

const ProductItem = props =>{
    return (
        <li className="product-item">
            <img alt="Book" src={props.image}></img>
            <h2>{props.name}</h2>
            <p>Price: ${props.price}</p>            
        </li>
    );
};


export default ProductItem;