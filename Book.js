import React from 'react';
class Book extends React.Component {
    constructor(props) {
     super(props);
     this.state = {
        Products: [],
        counter: 0
      };
      // This binding is necessary to make `this` work in the callback
  this.cart = this.cart.bind(this);
  this.increment = this.increment.bind(this);
  this.decrement = this.decrement.bind(this);
  
}
componentDidMount() {
    
  fetch('http://localhost:5000/api/storeBooks')
  .then(response => response.json())
  .then(data => {
    this.setState({
      isLoaded: true,
      Books: data.products
    });
  });
}

cart(e){
    e.preventDefault();    
    //console.log('The link was clicked.');
    e.currentTarget.className="hide";
    e.currentTarget.nextElementSibling.className="show"
    this.increment();  
}
increment() {
    this.setState((state, props) => ({
        counter: state.counter + 1
      }));
      localStorage.setItem(this.props.price, this.state.counter + 1);
    //   this.setState((state, props) => ({
    //     Products: this.state.Products.concat([...props])
    //   }));
    //console.log(localStorage.getItem(this.props.price));
    //console.log(localStorage);
  }
decrement() {
    this.setState((state, props) => ({
        counter: state.counter >= 1 ? state.counter - 1 : 0
      }));
      localStorage.setItem(this.props.price, this.state.counter >= 1 ? this.state.counter - 1 : 0);
     // console.log(localStorage.getItem(this.props.price));
      
    //   this.setState((state, props) => ({          
    //     Products: [...this.state.Products, { cart_name:this.props.name, cart_img:this.props.img_src, cart_price:this.props.price, cart_count: this.state.counter }]
    //   }));
      
  }
     render() {
        // var oldItems = JSON.parse(localStorage.getItem('Detail')) || [];
        // var newItem = this.state.Products;
        // oldItems.push(newItem);
        
        // localStorage.setItem('Detail', JSON.stringify(oldItems));
        // let detail = this.state.Products;
        // localStorage.setItem('Detail', JSON.stringify(detail));
    return (
    <div key={this.props.Value_key} className="Book">
     <img alt="" src={this.props.image_Src}></img>
     <h2>{this.props.name}</h2>
     <h3 className="price">${this.props.price}</h3>
     <div className="text-right">
         <a className="" href="/">Details</a>
         <button className="show" onClick={this.cart}>Add to cart</button>
         <div className="hide">
        <button onClick={this.increment}>+</button> 
        <span>  { this.state.counter}    </span>  
        <button onClick={this.decrement}>-</button>     
         </div>
     </div>
    </div>
    );
    }
}

  export default Book;
  
