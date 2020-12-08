import React from 'react';
import Book from './Book.js';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            date: new Date(),
            Books: [],
            isLoaded: false,
            quantity:0
        };
        this.addToCart=this.addToCart.bind(this);
        this.close=this.close.bind(this);
        
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    //     fetch('http://localhost:5000/products')
    //   .then(response => response.json())
    //   .then(data => this.setState({Books: data.Books }));
           
      fetch('http://localhost:5000/api/storeBooks')
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          Books: data
        });
      });
        // var values;
        // for (var i = 0; i < localStorage.length; i++){
        //     values.push(localStorage.getItem(localStorage.key(i)));
        //     console.log(values);
        // }  
       
        localStorage.clear();
    }
    componentDidUpdate(){
        //console.log(parseInt(localStorage.key(localStorage.length-1)));
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
        localStorage.clear();
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    addToCart(e){
        e.preventDefault();
        e.stopPropagation();
        console.log('The link was clicked.');
        e.currentTarget.parentElement.nextElementSibling.className = "cart-preview active";
               
    }
    close(e){
        if(document.querySelectorAll(".cart-preview")[0].className=="cart-preview active"){
        document.querySelectorAll(".cart-preview")[0].className="cart-preview hide";
        }
    }

    render() {
        const { Books } = this.state; 
        var values=[], arr_values = [], value_price = [];
        let Totalprice = 0;
        //console.log(localStorage);
        if(localStorage.length>0){
        for (var i = 0; i < localStorage.length; i++){
            values.push(parseInt(localStorage.getItem(localStorage.key(i))));
            value_price.push(parseInt(localStorage.key(i)));
            Totalprice +=  parseFloat(localStorage.getItem(localStorage.key(i))) *  parseFloat(localStorage.key(i));       
        } 
    } 
        
        arr_values=values;
        
        const listItems = Books.map((item) =>
            <Book key={item.id} id={item.id} price={item.price} name={item.title} image_Src={item.image}></Book>
        );   
        if (!this.state.isLoaded) {
            return <div>Loading ... </div>;
          } 
          else { 
              return (
            <div onClick={this.close} className="Home">
                <h2>Cart</h2>
                <p>It is {this.state.date.toLocaleTimeString()}.</p>
                <div className="cart">
                    <div className="cart-info">
                        <table>
                            <tbody>
                                <tr>
                                    <td>No. of items</td>
                                    <td>:</td>
                                    <td><strong>{localStorage.length > 0 ? arr_values.reduce((a, b) => a + b, 0) : 0} </strong></td>
                                </tr>
                                <tr>
                                    <td>Sub Total</td>
                                    <td>:</td>
                                    <td><strong>${Totalprice}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <a className="cart-icon" href="#" onClick={this.addToCart}>
                        <img src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" alt="Cart"/>
                     </a>
                </div>
                <div class="cart-preview hide">
                    <div>
                    {localStorage.length == 0  
                    ? 
                        <div>
                            <div className="empty-cart">
                                <img src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart" />
                                <h2>You cart is empty!</h2>
                            </div>
                        </div>
                    :
                    
                    <div className="cart-info">
                    <table>
                        <tbody>
                            <tr>
                                <td>No. of items</td>
                                <td>:</td>
                                <td><strong>{localStorage.length > 0 ? arr_values.reduce((a, b) => a + b, 0) : 0}</strong></td>
                            </tr>
                            <tr>
                                <td>Sub Total</td>
                                <td>:</td>
                                <td><strong>${Totalprice}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                   
                    
                     }
                    </div>
                    <div className="action-block">
                        <button type="button" className="disabled">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
                <div className="BooksGrid">
                    {listItems}
                </div>
            </div>
        );
    }
}
}

export default Cart;
