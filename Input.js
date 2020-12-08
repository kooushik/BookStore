import React from 'react';

const Input = props =>{
    return (
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label>
            <input  type={props.type}
             type={props.type}
             step={props.step}
             value={props.value}
             id={props.id} 
             onChange={props.onChange}/>
        </div>
    );
};

export default Input;