import React, {useState} from 'react';

import "./DailySalesReport.css";

//dictionary for manu id and the amount purchased
const taco1 = { menu_id: 'Taco 1', price: 10.00, amountPurchased: 12, itemProfit: 0.0}
const taco2 = {menu_id: 'Taco 2', price: 7.99, amountPurchased:3, itemProfit: 0.0}
const tacotaco = {menu_id: 'TacoTaco', price: 13.99, amountPurchased:20, itemProfit: 0.0}
const dictionary = { menu_id: 0, price: 0.00, amountPurchased: 0, itemProfit: 0.0}
//const currDate = new Date();

//temp array for dsr for menu information
const DSR = [ //plan is to have an array of dictionary, date, and
    { dict: [taco1, tacotaco,]}, //date: ((currDate.getMonth()+1) + '/' + currDate.getDate() + '/' +  currDate.getFullYear())},
    { dict: [taco2,]}, //date: ((currDate.getMonth()+1) + '/' + currDate.getDate()-1 + '/' +  currDate.getFullYear())},
    { dict: [dictionary,]},// date: ((currDate.getMonth()+1) + '/' + currDate.getDate() + '/' +  currDate.getFullYear())},
    { dict: [dictionary,]},
    { dict: [dictionary,]}, //date
]



export default function DailySalesReport(){
    const [dailySales, setDailySales] = useState(DSR);
    const [dailySale, setDailySale] = useState({dict: dictionary});
    const [ItemProfit, setItemProfit] = useState(0);
    const [count, setCount] = useState(0);

    const handleDailySales = ({target}) => {
        if (target.dataset.index) {                  //ensures index is not undefined
            setItemProfit(() => (this.dict.price * this.dict.amountPurchased));
            setDailySale(() => dailySales[target.dataset.index - 1]);
        }
    }

    
    let totalProfit = 0.00; //the total found
    function setProfit(curDS){
        if(curDS !== undefined){
            //initially profit is set to $0.00, to show any errors
            {}
            let profit = (curDS.dict.price * curDS.dict.amountPurchased);
            totalProfit = totalProfit + profit;
        } 
    }

    let offset=0;
    function adjustOffset(number){
        offset = offset + number;
    }

    let current = new Date();
    function setDate(index){
        const date = '${current.getDate()}/${current.getMonth()+1}/${current.getFulYear()}';
       if(index>0)
       {
            //if((current.getDate() - index) > 0)
       }
       current = date;
    }

    let totalItemsSold = 0;
    

    return(
        <div className="DSR">
            <h1>DSR</h1>
            <div className="DSR-visual">
                <h3 className="header">Item&emsp;&emsp;&emsp;|&emsp;&ensp;Qty&ensp;&emsp;|&emsp;&ensp;Price&ensp;&emsp;|&emsp;&emsp;Total Profit&ensp;</h3>
                <div className="body">
                    { dailySales.map((dailySale, index) =>
                        <>
                            {setProfit(dailySale)}
                                
                                
                        </>
                        
                    )}
                </div>
            </div>
            <div className="DSR-date">
                <p>Date:<br/>
                    <p className="block">
                        TIME
                    </p>    
                </p>
                <p >Number of Items Ordered:<br/>
                    <p className="block">

                    </p>
                </p>
                <p >Total Profit:<br/>
                    <p className="block">
                        ${totalProfit}
                    </p>
                </p>
            </div>
        </div>
    );
}
