import React, {useState, useEffect, useMemo } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import api from "../../../../api";

import "./DailySalesReport.css";
import 'bootstrap/dist/css/bootstrap.min.css';


//dictionary for manu id and the amount purchased
const individualOrder = {name: '', price: '', quantity: 1};

export default function DailySalesReport(){
    const [sales, setSales] = useState([]);             //to store all items that have sold
    const [dailySales, setDailySales] = useState([]);  //to store all values shown by dsr 

    useEffect(() => {
        handleGetOrders()
        const intervalId = setInterval(() => {
            handleGetOrders()
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    //gets orders from the db
    const handleGetOrders = async () => {
        await api.getAllOrders().then(orders => {
            const curr_orders = orders.data.data
                
            let tempOrders = []
            curr_orders.map((order) => {
                if (order.status === "Paid") {
                    tempOrders = [...tempOrders, order]           //adds orders to the inactive queue
                }
            })

            //reset profit - this prevents profit from constantly increasing
            setTotalProfit((prev) => (0.00))
            //reset number of items ordered
            setTotalNumItems((prev) => (0))
            let tempItems = []
            tempOrders.map((order) => {
                //calculate profit
                handleProfit(order.total)
                //store each item ordered
                let tempBool = false
                order.order_items.map((item) => {
                    let tempDate = order.createdAt.slice(0, 10)
                    let tempSale = {name: '', price: '', quantity: 1, date: tempDate}
        
                    tempBool = false;
                    for(let i=0; i<tempItems.length; i++) {
                        if(item.name === tempItems[i].name)
                        {
                            tempItems[i].quantity++;
                            tempBool = true;
                            //calculate number of items ordered
                            handleQuantityIncrease();
                            break;
                        }
                    }
                    if(!tempBool)
                    {
                        tempSale.name = item.name
                        tempSale.price = item.price
                        tempSale.quantity = 1
                        tempItems = [...tempItems, tempSale]  
                        //calculate number of items ordered
                        handleQuantityIncrease();
                    } 
                })
            })
                
            //set states to temps 
            setSales(tempItems)
            console.log("DSR Sales: " + sales)          
        })
        
    }

    //render all sales
    const renderSales = (item, index) => {
        return(
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        )
    }

    //increase quantity of item by 1
    const [totalNumItems, setTotalNumItems] = useState(0);
    const handleQuantityIncrease = () => {
        setTotalNumItems((prev) => (prev + 1))
    }

    const [totalProfit, setTotalProfit] = useState(0.00); //the total found
    const handleProfit = (amount) => {
        setTotalProfit((prev) => (prev + amount))  
    }

    let offset=0;
    function adjustOffset(number){
        offset = offset + number;
    }

    let current = new Date();
    const setDate = () => {
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
       current = date;
       console.log(current);
    }
    

    return(
        <div className="DSR">
            <h1>DSR</h1>
            <div className="DSR-visual">
                <ReactBootStrap.Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                       {sales.map(renderSales)}
                    </tbody>
                </ReactBootStrap.Table>
            </div>
            <div className="DSR-date">
                <p>Date:<br/>
                    <p className="block">
                        {current.getMonth()+1}/{current.getDate()}/{current.getFullYear()}
                    </p>    
                </p>
                <p >Number of Items Ordered:<br/>
                    <p className="block">
                        {totalNumItems}
                    </p>
                </p>
                <p >Total Profit:<br/>
                    <p className="block">
                        ${totalProfit.toFixed(2)}
                    </p>
                </p>
            </div>
        </div>
    );
}
