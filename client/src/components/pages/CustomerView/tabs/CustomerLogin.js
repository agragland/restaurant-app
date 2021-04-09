import React, {useState, useEffect } from 'react';
import api from '../../../../api'

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

        console.log(payload)
        //add to database
        await api.insertCustomer(payload).then(res => {
            window.alert(`Item inserted seccessfully`)
            customer = {
                name: '',
                email: '',
                phoneNumber: '',
                birthday: '',
                rewards: [],
                stampCount: 0
            }
        }) 

        return({submitHandler})
    }



    return (
        <>
        <form className="signin-form" onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Customer Login</h2>
                {error}
                {/*enter name*/}
                <div className='form-group'>
                    <label  htmlFor='name'>Name:</label>
                    <input type="text" placeholder="Enter name here" value={customer.name} onChange={setValue('name')} />
                </div>
                {/*enter email*/}
                <div className='form-group'>
                    <label  htmlFor='email'>E-mail:</label>
                    <input type="text" placeholder="Enter Email here" value={customer.email} onChange={setValue('email')} />
                </div> 
                {/*enter phone number*/}
                <div className='form-group'>
                    <label  htmlFor='phoneNumber'>Phone Number:</label>
                    <input type="text" placeholder="Enter phone number here" value={customer.phoneNumber} onChange={setValue('phoneNumber')} />
                </div>             
                
                <input type='submit' value='LOGIN' /> <br/>
                <div style={{justifySelf: 'start'}}>
                <button onClick={handleAddClick} style={{justifySelf: 'left'}}>Create New Account</button>    
                <button onClick={Guest} style={{justifySelf: 'right'}} >Continue As Guest</button> 
                </div>
            </div>
        </form>
        <AddModal show={showAdd}>
         
            <form className='signin-form' onSubmit={AddCustomer} >
                <div className='form-inner'>
                    <h2 style={{fontSize: "18px"}}>Create Customer Account</h2>
                    {/*enter name*/}
                    <div className='form-group'>
                        <label  htmlFor='name'>Name:</label>
                        <input type="text" placeholder="Enter name here" value={customer.name} onChange={setValue('name')} />
                    </div>
                    {/*enter email*/}
                    <div className='form-group'>
                        <label  htmlFor='email'>E-mail:</label>
                        <input type="text" placeholder="Enter Email here" value={customer.email} onChange={setValue('email')} />
                    </div> 
                    {/*enter phone number*/}
                    <div className='form-group'>
                        <label  htmlFor='phoneNumber'>Phone Number:</label>
                        <input type="text" placeholder="Enter phone number here" value={customer.phoneNumber} onChange={setValue('phoneNumber')} />
                    </div>   
                    {/*enter phone number*/}
                    <div className='form-group'>
                        <label  htmlFor='birthday'>Birthday:</label>
                        <input type="text" placeholder="Enter birthday here" value={customer.birthday} onChange={setValue('birthday')} />
                    </div>  
                    <div style={{position: 'relative', left: '-15%'}}>
                        <button onClick={handleAddClick}>Back</button> 
                        <input type='submit' value='Create Account' /> 
                    </div>            
                </div>
            </form>
        </AddModal>
        </>
    )
}

export default CustomerLogin