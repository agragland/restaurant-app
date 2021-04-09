import './CustomerView.css'
import api from '../../../api'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Time from "../../Clock";
import Navbar from "./Navbar";
import React, {useState, useEffect} from "react";
import Modal from "../../Modal";

import CustomerLogin from './tabs/CustomerLogin'
import MenuView from "./tabs/MenuView";
import OrderView from "./tabs/OrderView";
import PaymentView from "./tabs/PaymentView";

export default function CustomerView() {
    const [showSignIn, setShowSignIn] = useState(true);
    const [customers, setCustomers] = useState([]); //to store all customers from database
    const [error, setError] = useState('');

    //data base 
    useEffect (() => {
        handleGetCustomer()
    }, []);
    //get and store all customer employee info
    const handleGetCustomer = async () => {
        await api.getAllCustomers().then(loyals => {
            const all_customers = loyals.data.data
            let temp_customers = []

            all_customers.map((loyal) => {

                //add to the temp array
                temp_customers = [...temp_customers, loyal] 
            })
            //set state to temp
            setCustomers(temp_customers)
            console.log(customers)
        })
    }

    //customer login 
    const Login = details => {
        console.log(details)
        customers.map((worker) => {
            //split into two seperate if statements to avoid multiple login errors
            if((details.name == worker.name) && (details.email == worker.email) && (details.phoneNumber == worker.phoneNumber)){ //if the user name matches
                handleLog();
            }
            else{ 
                setError('Credentials do not match. Please try again.');
            }
        })
    }
    //guest login
    const LoginGuest = () => {
        handleLog();
    }

    //determines the view of the customer navbar
    const [isLogged, setIsLogged] = useState(false);
    const handleLog = () => {
        setIsLogged(!isLogged);
    }

    const handlePassword = () => {
        setShowSignIn(() => !showSignIn)
    }

    return (
        <>

        <div className='customer'>
            <Router>
                <Time />
                <div className='customer-title'>
                    Customer
                </div>
                {/*if customer is logged in, show the navbar */}        
            { isLogged ?
                <div className='customer-body'>

                    <Navbar/>
                    {/*Consumer Settings*/}
                    <Route exact path="/Rewards"  />
                    {/*DailySalesReport*/}
                    <Route exact path="/Menu" component={MenuView} />
                    {/*Change Log */}
                    <Route exact path="/Order" component={OrderView}  />
                    {/*Lobby View*/}
                    <Route exact path="/Payment" component={PaymentView}  />
                </div> :
                /*else, show customer log in page*/
                <div className='login' > 
                <CustomerLogin Login={Login} Guest={LoginGuest} error={error} />  
                </div>
            }

            </Router>
        </div>
        </>
    );
}