import React, {useState, useEffect, useMemo } from 'react';
import { render } from 'react-dom';
import { useTable } from 'react-table';
import api from "../../../../api";

import "./DailySalesReport.css";


//dictionary for manu id and the amount purchased
const individualOrder = {  name: "", price: 0.00, qty: 0}

//temp array for dsr for menu information
const DSR = { createdAt: "", items: [], numOrder: 0, totalProfit: 0.00, date: ""}

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
            console.log(tempOrders)

            //reset profit
            setTotalProfit((prev) => (0.00))
            let tempItems = []
            tempOrders.map((order) => {
                //calculate profit
                handleProfit(order.total)
                //store each item ordered
                order.order_items.map((item) => {
                    tempItems = [...tempItems, item]
                })
            })
                
            
            //set states to temps 
            setSales(tempItems);
            console.log(sales)

            //calculate number of items ordered
             
        })
        
    }

    //increase quantity of item by 1
    const handleQuantityIncrease = (val) => {
        sales.map((order) => {
            
        })
    }

    const [totalProfit, setTotalProfit] = useState(0.00); //the total found
    const handleProfit = (amount) => {
        setTotalProfit((prev) => (prev + amount))   
        console.log("Profit: " + totalProfit)     
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

    let totalItemsSold = 0;
    

    return(
        <div className="DSR">
            <h1>DSR</h1>
            <div className="DSR-visual">
               <p className="item">
                   <h3 style={{top: '0px'}}>Item</h3>
                   
                   { sales.map((item) => {
                       <p>{item.name}</p>
                    })
                   }
                   
               </p>
               <p className="quantity">
                    <h3 style={{top: '0px', textAlign: 'center'}}>Qty</h3>

               </p>
               <p className="price">
                   <h3 style={{top: '0px'}}>Price</h3>

               </p>
               <p className="profit">
                   <h3 style={{top: '0px'}}>Profit</h3>

               </p>
            </div>
            <div className="DSR-date">
                <p>Date:<br/>
                    <p className="block">
                        {current.getMonth()+1}/{current.getDate()}/{current.getFullYear()}
                    </p>    
                </p>
                <p >Number of Items Ordered:<br/>
                    <p className="block">
                        {dailySales.numOrder}
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
