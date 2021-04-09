import React, {useState, useEffect } from 'react';

import './CustomerLogin.css'

//makes add customer modal
function AddModal({show, children}) {
    if(!show)
        return null;

    return (
        <div className="modal-background">
            <section className="modal-add-item">
                {children}
            </section>
        </div>
    ); 
} 

function CustomerLogin({ Login, Guest, error }) {
    const [customer, setCustomer] = useState({ name: '', email: '', phoneNumber: ''}); //login credentials for customer

    //add customer option
    const [showAdd, setShowAdd] = useState(false);
    const handleAddClick = () => {
        setShowAdd((prev) => !prev);
    }

    //save user inputed data
    const setValue = (variable) => {
        return({target: {value}}) => {
            setCustomer( customer => ({...customer, [variable]: value}));
        }
    };

    const submitHandler = e => {
        e.preventDefault(); //prevents duplicate entries

        Login(customer)
        console.log(error)
    }

    return (
        <form className="signin-form" onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Customer Login</h2>
                {error}
                <div className='form-group'>
                    <label  htmlFor='empoyee id'>Name:</label>
                    <input type="text" placeholder="Enter Employee ID here" value={customer.name} onChange={setValue('name')} />
                </div>
                <div className='form-group'>
                    <label  htmlFor='password'>E-mail:</label>
                    <input type="text" placeholder="Enter Password here" value={customer.email} onChange={setValue('email')} />
                </div> 
                <div className='form-group'>
                    <label  htmlFor='password'>Phone Number:</label>
                    <input type="text" placeholder="Enter Password here" value={customer.phoneNumber} onChange={setValue('phoneNumber')} />
                </div>             
                
                <input type='submit' value='LOGIN' /> <br/>
                <div style={{justifySelf: 'start'}}>
                <button onClick={handleAddClick} style={{justifySelf: 'left'}}>Create New Account</button>    
                <button onClick={Guest} style={{justifySelf: 'right'}} >Continue As Guest</button> 
                </div>
            </div>
        </form>
    )
}

export default CustomerLogin