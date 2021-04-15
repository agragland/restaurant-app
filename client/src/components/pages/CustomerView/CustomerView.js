import './CustomerView.css'
import api from '../../../api'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {createBrowserHistory} from 'history'
import Time from "../../Clock";
import Navbar from "./Navbar";
import React, {useState, useEffect} from "react";
import Modal from "../../Modal";

import CustomerLogin from './tabs/CustomerLogin'
import MenuView from "./tabs/MenuView";
import OrderView, {updateCoupon, getCoupon} from "./tabs/OrderView";
import PaymentView from "./tabs/PaymentView";
import KidsCorner from "./tabs/KidsCorner"

export default function CustomerView() {
    const [customers, setCustomers] = useState([]); //to store all customers from database
    const [error, setError] = useState('');
    const history = createBrowserHistory();

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
            console.log(temp_customers)
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
        updateCoupon(0)
        handleLog();
    }

    //determines the view of the customer navbar
    const [isLogged, setIsLogged] = useState(false);
    const handleLog = () => {
        const tempCoupon = getCoupon()
        //sets default table (table 8) to occupied
        api.getTableByNum(8).then(table => {
            let tempTable = table.data.data
            if (tempTable.status === "Available")
                tempTable.status = "Occupied"
            api.updateTable(8, tempTable)
            updateCoupon(tempCoupon)
            setIsLogged(!isLogged);
        })
    }

    return (
        <>
        <div className='customer'>
            <Router history={history}>
                <Time />
                <div className='customer-title'>
                    <h1>Customer</h1>
                </div>
                {/*if customer is logged in, show the navbar */}
            { isLogged ?
                <div className='customer-body'>

                    <Navbar/>
                    {/*Menu*/}
                    <Route exact path="/Menu" component={MenuView} />
                    {/*Order*/}
                    <Route exact path="/Order" component={OrderView}  />
                    {/*Payment*/}
                    <Route exact path="/Payment" component={PaymentView}  />
                    {/*Games*/}
                    <Route exact path="/KidsCorner" component={KidsCorner} />
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