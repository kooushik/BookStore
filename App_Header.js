import React from 'react';
import {
BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";
import Home from './Home.js';
import logo from './logo.svg';
 import Cart from './Cart.js';
 import About from './About.js';

export default function App_Header() {
return (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>            
          <li>
            <Link to="/home">Home</Link>
          </li>        
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>        
        <Route path="/Home">
          <Home />
        </Route>        
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/">
          <About />
        </Route>
      </Switch>
    </div>
  </Router>
);
}

// function About() {
//   return (
//     <div className="App">    
//     <h2>About</h2>
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
    
//   </div>
//   );
// }

// function Cart() {
//   return <h2>Cart</h2>;
// }