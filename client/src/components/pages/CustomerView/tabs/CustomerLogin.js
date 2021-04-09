import React, {useState, useEffect } from 'react';

import './CustomerLogin.css'

function CustomerLogin({ Login, error }) {
    const [customer, setCustomer] = useState({ emp_id: '', password: ''}); //login credentials for customer

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
                    <label  htmlFor='empoyee id'>Employee ID:</label>
                    <input type="text" placeholder="Enter Employee ID here" value={customer.emp_id} onChange={setValue('emp_id')} />
                </div>
                <div className='form-group'>
                    <label  htmlFor='password'>Password:</label>
                    <input type="password" placeholder="Enter Password here" value={customer.password} onChange={setValue('password')} />
                </div>              
                
                <input type='submit' value='LOGIN' />
            </div>
        </form>
    )
}

export default CustomerLogin