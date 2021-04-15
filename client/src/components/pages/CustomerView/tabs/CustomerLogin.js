import React, {useState, useEffect } from 'react';
import api from '../../../../api'
import {updateCoupon} from './OrderView'

import './CustomerLogin.css'

//makes add customer modal
function AddModal({show, children}) {
    if(!show)
        return null;

    return (
        <div className="add-modal-background">
            <section className="add-modal-add-item">
                {children}
            </section>
        </div>
    ); 
} 

function CustomerLogin({ Login, Guest, error }) {
    const [customer, setCustomer] = useState({ name: '', email: '', phoneNumber: '', birthday: '', rewards: [], stampCount: 0}); //login credentials for customer

    //customer login
    const submitHandler = e => {
        e.preventDefault(); //prevents duplicate entries

        updateCoupon(2)
        Login(customer)
        console.log(error)
    } 

    //set the value of an input 
    const setValue = (variable) => {
        return({target: {value}}) => {
            setCustomer(customer => ({...customer, [variable]: value}));
        }
    };

    //for add modal vv-----------------------------------------------------------------------------------------------
       
    //add customer option
    const [showAdd, setShowAdd] = useState(false);
    const handleAddClick = () => {
        setShowAdd((prev) => !prev);
    }

    //add item to database and menu
    const AddCustomer = async () => {
        const {name, email, phoneNumber, birthday, rewards, stampCount} = customer
        const payload = {name, email, phoneNumber, birthday, rewards, stampCount}

        //add to database
        await api.insertCustomer(payload).then(res => {
           window.alert(`Item inserted successfully`)
        })
        handleAddClick();
        console.log(customer)
        Login(customer)
    }

    const [customers, setCustomers] = useState({})
    const handleGetCustomer = async () => {
        await api.getAllCustomers().then(loyals => {
            const all_customers = loyals.data.data
            let temp_customers = []

            all_customers.map((loyal) => {

                //add to the temp array
                temp_customers = [...temp_customers, loyal]
            })
            //set state to temp
            console.log(temp_customers)
            setCustomers(temp_customers)
            console.log(customers)
        })
    }

    const [errorMsg, setErrorMsg] = useState(error)
    //customer login
    const checkUnique = () => {
        console.log(customer)
        handleGetCustomer()
        customers.map((worker) => {
            //split into two seperate if statements to avoid multiple login errors
            if(false){ //if the user name matches
                setErrorMsg('Credentials do not match. Please try again.')
            }
            else{
                AddCustomer()
            }
        })
    }

    return (
        <>
        <form className="signin-form" onSubmit={submitHandler}>
            <div className='form-inner'>
                <h1>Customer Login</h1>
                {error}
                {/*enter name*/}
                <div className='form-group'>
                    <label  htmlFor='name'>Name:</label>
                    <input type="text" title="John Doe" value={customer.name} onChange={setValue('name')} />
                </div>
                {/*enter email*/}
                <div className='form-group'>
                    <label  htmlFor='email'>E-mail:</label>
                    <input type="text" title="real@email.com" value={customer.email} onChange={setValue('email')} />
                </div> 
                {/*enter phone number*/}
                <div className='form-group'>
                    <label  htmlFor='phoneNumber'>Phone Number:</label>
                    <input type="text" title="1234567890" value={customer.phoneNumber} onChange={setValue('phoneNumber')} />
                </div>             
                
                <input type='submit' value='LOGIN' /> <br/><br/><br/><br/>
                <div style={{justifySelf: 'start'}}>
                    <button onClick={handleAddClick}>Create New Account</button>
                    <button onClick={Guest}>Continue As Guest</button>
                </div>
            </div>
        </form>
        <AddModal show={showAdd}>
            <form className='signin-form' onSubmit={AddCustomer} >
                <div className='form-inner'>
                    <h2>Create Customer Account</h2>
                    {/*enter name*/}
                    <div className='form-group'>
                        <label  htmlFor='name'>Name:
                            <input type="text" title="John Doe" value={customer.name} onChange={setValue('name')} />
                        </label>
                    </div>
                    {/*enter email*/}
                    <div className='form-group'>
                        <label  htmlFor='email'>E-mail:
                            <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="real@email.com" value={customer.email} onChange={setValue('email')} />
                        </label>
                    </div>
                    {/*enter phone number*/}
                    <div className='form-group'>
                        <label  htmlFor='phoneNumber'>Phone Number:
                            <input type="text" pattern="[0-9]{10}" title="1234567890" value={customer.phoneNumber} onChange={setValue('phoneNumber')} />
                        </label>
                    </div>
                    {/*enter phone number*/}
                    <div className='form-group'>
                        <label  htmlFor='birthday'>Birthday:
                            <input type="text" title="01/01/2000" value={customer.birthday} onChange={setValue('birthday')} />
                        </label>
                    </div>  
                    <div>
                        <input type='submit' value='Create Account' />
                        <br/>
                        <button onClick={handleAddClick}>Back</button>
                    </div>
                </div>
            </form>
        </AddModal>
        </>
    )
}

export default CustomerLogin