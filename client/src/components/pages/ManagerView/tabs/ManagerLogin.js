import React, {useState, useEffect } from 'react';

import './ManagerLogin.css'

function ManagerLogin({ Login, error }) {
    const [manager, setManager] = useState({ emp_id: '', password: ''}); //login credentials for manager

    const setValue = (variable) => {
        return({target: {value}}) => {
            setManager( manager => ({...manager, [variable]: value}));
        }
    };

    const submitHandler = e => {
        e.preventDefault(); //prevents duplicate entries

        Login(manager)
        console.log(error)
    }

    return (
        <form className="signin-form" onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Manager Login</h2>
                {error}
                <div className='form-group'>
                    <label  htmlFor='empoyee id'>Employee ID:</label>
                    <input type="text" placeholder="Enter Employee ID here" value={manager.emp_id} onChange={setValue('emp_id')} />
                </div>
                <div className='form-group'>
                    <label  htmlFor='password'>Password:</label>
                    <input type="password" placeholder="Enter Password here" value={manager.password} onChange={setValue('password')} />
                </div>              
                
                <input type='submit' value='LOGIN' />
            </div>
        </form>
    )
}

export default ManagerLogin
