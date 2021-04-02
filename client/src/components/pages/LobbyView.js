import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import './LobbyView.css';
import api from "../../api";

const classicTaco = {name: "Classic Taco", price: 7.99}
const wackyTaco = {name: "Wacky Taco", price: 12.99}
const available = {status: "Available", orders: [[]], drinks: []}

//temporary array for items
const globalTables = [
    available, available, available, available, available, available, available, available, available, available,
    available, available, available, available, available, available, available, available, available, available,
]

export default function TableView() {
    const [tables, setTables] = useState(globalTables)
    const [tableNum, setTableNum] = useState("1");  //the number of the table (1-20)
    const [table, setTable] = useState({status: "Available", orders: []});

    useEffect(() => {
        handleGetOrders()
        // const intervalId = setInterval(() => {
        //     handleGetOrders()
        // }, 10000);
        //
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, []);

    //gets all orders from database and sets states
    const handleGetOrders = async () => {
        await api.getAllOrders().then(orders => {
            const curr_orders = orders.data.data
            console.log(curr_orders)
            let tempTables = []

            for(let i = 0; i < 20; i++)
                tempTables = [...tempTables, {status: "Available", orders: [], drinks: []}]         //initializes array

            curr_orders.map((order) => {
                let tableNum = order.table-1        //table number corresponding to the order

                //add order to table if it's in the kitchen
                if(order.status === "Created" || order.status === "Cooking") {
                    tempTables[tableNum].orders = [...tempTables[tableNum].orders, order]
                        if (tempTables[order.table-1].status !== "Order Ready")
                            tempTables[order.table-1].status = "Occupied"   //set status if table is not order ready
                }
                //if table is ready or paid
                else if(order.status === "Ready" || order.status === "Delivered") {
                    //adds drinks to array if status is delivered or ready
                    order.order_items.map(item => {
                        if(item.category === "drinks")
                            tempTables[tableNum].drinks = [...tempTables[tableNum].drinks, item]
                    })
                    if (tempTables[order.table-1].status !== "Order Ready")
                        tempTables[order.table-1].status = "Occupied"   //set status if table is not order ready
                    //adds order to array if ready
                    if(order.status === "Ready") {
                        tempTables[tableNum].orders = [...tempTables[tableNum].orders, order]
                        tempTables[tableNum].status = "Order Ready"     //set table status
                    }
                }
            })

            //set states to temps
            setTables(tempTables)
        })
    }

    //updates database
    const handleUpdateOrder = async (payload) => {
        await api.updateOrder(payload._id, payload)
    }

    //sets table and tableNum based on selected table button
    const handleSetTableVals = ({target}) => {
        if (target.dataset.index) {                  //ensures index is not undefined
            setTableNum(() => target.dataset.index);
            setTable(() => tables[target.dataset.index - 1]);
        }
    }

    //handles table modal button
    const [tableShow, setTableShow] = useState(false);
    const handleTableClick = ({target}) => {        //when a table button is clicked
        handleSetTableVals({target});
        setTableShow((prev) => !prev);  //toggles table modal
    };

    //handles order modal button
    const [orderShow, setOrderShow] = useState(false);
    const handleOrderClick = ({target}) => {        //when the show order button is clicked
        handleSetTableVals({target})

        setTableShow((prev) => !prev);  //toggles table modal
        setOrderShow((prev) => !prev);  //toggles order modal
    };

    //handles "Complete Request" button
    const handleCompleteClick = () => {
        if(table.status === "Order Ready"){
            table.orders.map((order, index) => {
                if(order.status === "Ready"){
                    order.status = "Delivered"      //sets order status to delivered
                    handleUpdateOrder(order)        //updates db

                    //change state
                    let tempOrders = [...table.orders]
                    tempOrders.splice(index, 1)
                    let tempTable = table
                    tempTable.orders = tempOrders
                    setTable(tempTable)
                }
            })
        }
        //check if table has other needs
        table.status = "Occupied";                  //resets table status to occupied

        setTableShow(() => false);
    };

    //handles "Remove" button click (for comping items)
    const handleRemoveClick = ({target}) => {
        let order = table.orders[target.dataset.orderindex]
        let price = order.order_items[target.dataset.itemindex].price
        order.subtotal -= price
        order.tax -= 0.0825 * price
        order.total -= 1.085 * price

        //handleUpdateOrder(order)      re-enable when ready

        setOrderShow(() => false);
        setTableShow(() => true);
    };

    //shows table's needs, if any
    function Needs({tableNum}) {
        if(!tableNum)
            return <></>

        const table = tables[tableNum - 1];
        //displays the needs of the table
        if (table.status === "Refill") {
            return (
                <div>
                    Refill requested for:
                    {table.drinks.map((drink) => (      //lists all drinks that need refills
                        <p>{drink}</p>
                    ))}
                </div>
            );
        }
        else if (table.status === "Help") {
            return(
                <div>
                    <p>Wait staff requested.</p>
                </div>
            );
        }
        else if (table.status === "Order Ready") {
            return(
                <div>
                    <p>Order ready to be delivered.</p>
                </div>
            )
        }
        else
            return null;
    }

    //sets color of table button
    let tableColor = "black";           //sets to black by default, to show any errors
    function setColor(curTable) {
        if(curTable !== undefined) {    //ensures curTable is not undefined
            const curStatus = curTable.status

            //sets button color based on status
            if (curStatus === "Refill")
                tableColor = "lightblue"
            else if (curStatus === "Occupied")
                tableColor = "lightgreen"
            else if (curStatus === "Help")
                tableColor = "#ffc87c"          //light orange
            else if (curStatus === "Order Ready")
                tableColor = "pink"
            else
                tableColor = "white"
        }
    }

    return (
        <div className="lobby">
            <p className="lobby-title">Lobby</p>
            {tables.map((table, index) => (
                <>
                    {setColor(table)}
                    <button className='tableButton' data-index={index+1} onClick={handleTableClick} style={{background: tableColor}}>
                        Table {index+1}
                        <br />
                        {table.status}
                    </button>
                </>
            ))}
            <Modal show={tableShow}>
                <button onClick={handleTableClick}>X</button>
                <button className='orderButton' onClick={handleOrderClick} disabled={!table.orders[0]} >Show Order</button>
                <p>
                    Table {tableNum}
                </p>
                <Needs tableNum={tableNum}/>
                <button onClick={handleCompleteClick} disabled={table.status === "Available" || table.status === "Occupied"}>Complete Request</button>
            </Modal>
            <Modal show={orderShow}>
                <button onClick={handleOrderClick}>X</button>
                <p>Table {tableNum} Order</p>
                {table.orders.map((order, orderIndex) => (
                    order.order_items.map((item, itemIndex) => (
                        <p>
                            {item.name}, ${item.price}
                            <button data-orderindex={orderIndex} data-itemindex={itemIndex} onClick={handleRemoveClick}>Remove</button>
                        </p>
                    ))
                ))}
            </Modal>
        </div>
    );
};