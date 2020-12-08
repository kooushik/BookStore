import React, { useEffect, useState } from 'react';
import Button from './Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const About  = props =>{
    const history = useHistory();
    const [enteredName, setEnteredName] = useState('');
    const [enteredPwd, setEnteredPwd] = useState('');
    const nameChangeHandler = event =>{
        setEnteredName(event.target.value);
    }
    const pwdChangeHandler = event =>{
        setEnteredPwd(event.target.value);
    }
    
    const handleOnSubmit = event => {
        event.preventDefault();
       
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/StoreProducts',
        data: {username: enteredName, password: enteredPwd} ,
        validateStatus: (status) => {
          return true; 
        },
      }).then(response => response.json())
      .catch(error => {
        console.error('There was an error!', error);
      });
      history.push(`/Home`);
}

    return (
    
 <section id="new-product">
          <h2>Login to Book store</h2>
          <form onSubmit={handleOnSubmit}>
              <input type="text" label="Username: " id="title" placeholder="Enter user name..." required onChange={nameChangeHandler}/>
              <input type="password" label="Password: " id="price" placeholder="Enter password..." required onChange={pwdChangeHandler}/>
              <br></br>
              <Button type="submit">Login</Button>
          </form>

      </section>
    );
    }


  export default About;
  
