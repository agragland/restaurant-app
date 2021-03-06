import React, {useState, useEffect, useMemo } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import api from "../../../../api";

import "./DailySalesReport.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DailySalesReport(){
    const [sales, setSales] = useState([]);                 //to store all items that have sold
    const [saleDays, setSaleDays] = useState([]);           //to store all values shown by dsr 
    const [saleTips, setSaleTips] = useState([]);           //to store all days with their tip amount
    const [currentDay, setCurrentDay] = useState("");       //active day DSR is on
    const [totalNumItems, setTotalNumItems] = useState(0);  //store number of items for that day
    const [totalProfit, setTotalProfit] = useState(0.00);   //the total profit for that day
    const [totalTips, setTotalTips] = useState(0.00);       //amount of tips earned for that day

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
                    tempOrders = [...tempOrders, order]  //adds orders to the inactive queue
                }
            })

            //temp arrays
            let tempItems = []
            let tempDays = ["Select Date",] //first variable is for select option
            let tempTips = []
            tempOrders.map((order) => {
                //store each item ordered
                let tempBool = false
                let tempDate = getDate(order.createdAt)

                //calculate tip from order
                let tempTip = {date: tempDate, tip: (order.total-order.subtotal)}
                tempTips = [...tempTips, tempTip]

                order.order_items.map((item) => {
                    let tempSale = {name: '', price: '', quantity: 1, date: tempDate}
                    //check if the data has been added, if not -> add
                    if((tempDays).indexOf(tempDate) === -1){
                        tempDays = [...tempDays, tempDate]
                    }

                    //populate all unique items that have been ordered (or increase quantity)
                    tempBool = false;
                    for(let i=0; i<tempItems.length; i++) {
                        if(item.name === tempItems[i].name && tempDate === tempItems[i].date) 
                        {                           
                            //increase quantity, set bool to true
                            tempItems[i].quantity++;
                            tempBool = true;
                            break;
                        }
                    }
                    if(!tempBool)
                    {
                        //set values
                        tempSale.name = item.name
                        tempSale.price = item.price
                        tempSale.quantity = 1
                        tempItems = [...tempItems, tempSale]  
                    } 
                })
            })
            //set total profit and 
            console.log("All Paid Orders: "); console.log(tempOrders)
            //set states to temps 
            setSales(tempItems)
            console.log("DSR Sales: "); console.log(sales)  
            setSaleDays(tempDays)
            console.log("DSR Days: "); console.log(saleDays)  
            setSaleTips(tempTips) 
            console.log("DSR Tips: "); console.log(tempTips)
        })
        
    }

    //render all sales
    const renderSales = (item, index) => {
        if(item.date === currentDay){
            return(
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>  
                    
                </tr>
            )
        }
    }

    //increase quantity of item by 1
    const handleQuantity = (amount) => {
        setTotalNumItems((prev) => (prev + amount))        
    }

    const handleProfit = (amount) => {
        setTotalProfit((prev) => (prev + amount)) 
    }

    const handleTips = (amount) => {
        setTotalTips((prev) => (prev + amount))
    }

    const handleDate = ({target}) => {
        setCurrentDay((prev) => (target.value));
    }

    const calculateTotals = ({target}) => {
        //reset tip total
        setTotalTips((prev) => (0.00))
        saleTips.map((info) => {
            //if current date, add to totals
            if(info.date === target.value){
                handleTips(info.tip)
            }
        })
        
        //reset profit and number of items ordered
        setTotalProfit((prev) => (0.00))
        setTotalNumItems((prev) => (0))
        sales.map((order) => {
            //if current date, add to totals
            if(order.date === target.value){
                handleProfit(order.price * order.quantity)
                handleQuantity(order.quantity)
            }
        })
        //set date
        handleDate({target})
    }

    //format date
    const getDate = (creationDate) => {
        const date = new Date(creationDate)
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()

        return(year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0': '') + day)
    }
    

    return(
        <div className="DSR">
            <h1>Daily Sales Report</h1>
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
                        <select value={currentDay} onChange={calculateTotals} style={{ width: '100%' }}>
                            { saleDays.map((date, index) => {
                                return(
                                    <option key={index} value={saleDays.index}>
                                    {date}
                                    </option>
                                )
                            })

                            }
                        </select>
                    </p>    
                </p>
                <p >Number of Items Ordered:<br/>
                    <p className="block">
                        {totalNumItems}
                    </p>
                </p>
                <p >Daily Tips:<br/>
                    <p className="block">
                        ${totalTips.toFixed(2)}
                    </p>
                </p>
                <p >Gross Income:<br/>
                    <p className="block"> 
                        ${(totalProfit+totalTips).toFixed(2)}
                    </p>
                </p>
            </div>
        </div>
    );
}
