import React, {useState, useEffect } from 'react';

function ManagerLogin({ Login, error }) {
    const [manager, setManager] = useState({ emp_id: '', password: ''}); //login credentials for manager

    const setValue = (variable) => {
        return({target: {value}}) => {
            setManager( manager => ({...manager, [variable]: value}));
        }
    };

    const submitHandler = e => {
        e.preventDefault();

        Login(manager)
    }

    return (
        <form>
            <div className='login-box'>
                <h2 className='login-title'>Manager Login</h2>
                {/* ERROR! */}
                <div className='login-group'>
                    <label  htmlFor='empoyee id'>Employee ID:</label>
                    <input type="text" placeholder="Enter Employee ID here" value={manager.emp_id} onChange={setValue('emp_id')} />
                </div>
                <div className='login-group'>
                    <label  htmlFor='password'>Password:</label>
                    <input type="password" placeholder="Enter Password here" value={manager.password} onChange={setValue('password')} />
                </div>
                <button className='signin' onClick={submitHandler}>LOGIN</button>
            </div>
        </form>
    )
}

export default ManagerLogin
