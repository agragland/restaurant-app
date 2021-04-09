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
    const [customer, setCustomer] = useState({ emp_id: '', password: ''});
    const [error, setError] = useState('');

    //data base 
    useEffect (() => {
        handleGetCustomer()
    }, []);
    //get and store all customer employee info
    const handleGetCustomer = async () => {
        await api.getAllCustomers().then(customers => {
            const all_customers = customers.data.data

            let tempCustomers = []
            all_customers.map((loyal) => {
                if(loyal.role === 'customer'){
                    tempCustomers = [...tempCustomers, loyal]
                }
            })
            //set state to temp
            setCustomers(tempCustomers)
            console.log(customers)
        })
    }

    //customer login 
    const Login = details => {
        console.log(details)
        customers.map((employee) => {
            //split into two seperate if statements to avoid multiple login errors
            if(details.emp_id == employee.emp_id){ //if the user name matches
                if(details.password == employee.password){ //check the password
                    handleLog();
                }
                else{ 
                    setError('Credentials do not match. Please try again.');
                }
            }
        })
        
        
    }
    //customer logout
    const Logout = () => {
        console.log("logout");
        handleLog();
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
                <p><br/><br/></p>
                <CustomerLogin Login={Login} Guest={LoginGuest} error={error} />  
                </div>
            }

            </Router>
        </div>
        </>
    );
}