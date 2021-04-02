import './CustomerView.css'
import api from '../../../api'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Time from "../Clock";
import Navbar from "./Navbar";
import React, {useState} from "react";
import Modal from "../../Modal";


import MenuView from "./tabs/MenuView";
import OrderView from "./tabs/OrderView";
import PaymentView from "./tabs/PaymentView";

export default function CustomerView() {
    const [showSignIn, setShowSignIn] = useState(true);

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
                </div>

            </Router>
        </div>
        </>
    );
}