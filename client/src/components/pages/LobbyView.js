import React, {useState, useEffect} from 'react';
import Modal from '../Modal';
import StaffMenu from "../Navbar/StaffMenu";

import './LobbyView.css';
import api from "../../api";

const available = {status: "Available", orders: [[]], drinks: [], assistance: false}

//temporary array for items
const globalTables = [
    available, available, available, available, available, available, available, available, available, available,
    available, available, available, available, available, available, available, available, available, available,
]

export default function TableView({Change}) {
    const [tables, setTables] = useState(globalTables)
    const [tableNum, setTableNum] = useState("1");  //the number of the table (1-20)
    const [table, setTable] = useState({status: "Available", orders: [], drinks: [], assistance: false});

    useEffect(() => {
        handleGetTables()

        const intervalId = setInterval(() => {
            handleGetTables()
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const refresh = () => {
        handleGetTables()
    }

    const handleGetTables = async () => {
        let tempTables = []
        for(let i = 0; i < 20; i++)
            tempTables = [...tempTables, {status: "Available", orders: [], drinks: [], assistance: false}]         //initializes array

        await api.getTables().then(db_tables => {
            const curr_tables = db_tables.data.data
            console.log(curr_tables)

            //sets status and drinks based on corresponding table in db
            curr_tables.map((table) => {
                tempTables[table.table_num-1].status = table.status
                tempTables[table.table_num-1].assistance = table.assistance
                tempTables[table.table_num-1].drinks = table.refills
            })
        })
        //calls to then get orders
        handleGetOrders(tempTables)
    }

    //gets all orders from database and sets states
    const handleGetOrders = async (tempTables) => {
        await api.getAllOrders().then(orders => {
            const curr_orders = orders.data.data
            console.log(curr_orders)


            curr_orders.map((order) => {
                let tableNum = order.table-1        //table number corresponding to the order

                //add order to table if it's in the kitchen
                if(order.status === "Created" || order.status === "Cooking" || order.status === "Ready" || order.status === "Delivered") {
                    tempTables[tableNum].orders = [...tempTables[tableNum].orders, order]
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

    const handleUpdateTable = async (payload) => {
        await api.updateTable(payload.table_num, payload)
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
                    if(order.subtotal === 0)
                        order.status = "Paid"       //sets order status to paid if order's cost is $0.00
                    else
                        order.status = "Delivered"  //sets order status to delivered

                    handleUpdateOrder(order)        //updates db

                    //change state
                    let tempOrders = [...table.orders]
                    tempOrders.splice(index, 1)
                    let tempTable = table
                    tempTable.orders = tempOrders
                    tempTable.status = "Occupied"
                    setTable(tempTable)
                }
            })
        }
        else if(table.drinks.length !== 0){
            let tempTable = table
            tempTable.drinks = []
            setTable(tempTable)
        }
        else if(table.assistance === true){
            let tempTable = table
            tempTable.assistance = false
            setTable(tempTable)
        }

        //update database
        handleUpdateTable({table_num: tableNum, status: "Occupied", refills: table.drinks, assistance: table.assistance})

        setTableShow(() => false);
    };

    //handles "Remove" button click (for comping items)
    const handleRemoveClick = ({target}) => {
        let order = table.orders[target.dataset.orderindex]
        let price = order.order_items[target.dataset.itemindex].price

        order.commped[target.dataset.itemindex] = true
        order.subtotal -= price
        order.tax -= 0.0825 * price
        order.total -= 1.085 * price

        handleUpdateOrder(order)      //re-enable when ready

        setOrderShow(() => false);
        setTableShow(() => true);
    };

    //shows table's needs, if any
    function Needs({tableNum}) {
        if(!tableNum)
            return <></>

        const table = tables[tableNum - 1];
        //displays the needs of the table
        if (table.status === "Order Ready") {
            return(
                <div>
                    <p>Order ready to be delivered.</p>
                </div>
            )
        }
        else if (table.drinks.length !== 0) {
            return (
                <div>
                    Refill requested for:
                    {table.drinks.map((drink) => (      //lists all drinks that need refills
                        <p>{drink}</p>
                    ))}
                </div>
            );
        }
        else if (table.assistance === true) {
            return(
                <div>
                    <p>Wait staff requested.</p>
                </div>
            );
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
            if (curStatus === "Order Ready")
                tableColor = "pink"
            else if (curTable.drinks.length !== 0)      //needs refill
                tableColor = "lightblue"
            else if (curTable.assistance === true)      //needs help
                tableColor = "#ffc87c"        //light orange
            else if (curStatus === "Occupied")
                tableColor = "lightgreen"
            else
                tableColor = "white"
        }
        return <></>
    }

    function setNeeds(curTable) {
        if(curTable !== undefined) {    //ensures curTable is not undefined
            const curStatus = curTable.status

            //sets button text based on status
            if (curStatus === "Order Ready")
                return "Order Ready"
            else if (curTable.drinks.length !== 0)      //needs refill
                return "Refill"
            else if (curTable.assistance === true)      //needs help
                return "Assistance Requested"
            else if (curStatus === "Occupied")
                return "Occupied"
            else
                return "Available"
        }
    }

    return (
        <div className="lobby">
            <p className="lobby-title">Lobby</p>
            <StaffMenu Change={Change} level={1} />
            <button className="refresh" onClick={refresh}>⟳</button>
            {tables.map((table, index) => (
                <>
                    {setColor(table)}
                    <button className='tableButton' data-index={index+1} onClick={handleTableClick} style={{background: tableColor}}>
                        Table {index+1}
                        <br />
                        {setNeeds(table)}
                    </button>
                </>
            ))}
            <Modal show={tableShow}>
                <button className="x-button" onClick={handleTableClick}>X</button>
                <button className='orderButton' onClick={handleOrderClick} disabled={!table.orders[0]} >Show Order</button>
                <br/>
                <p>
                    Table {tableNum}
                </p>
                <Needs tableNum={tableNum}/>
                <button onClick={handleCompleteClick} disabled={!(table.status === "Order Ready" || table.drinks.length !== 0 || table.assistance)}>Complete Request</button>
            </Modal>
            <Modal show={orderShow}>
                <button className="x-button" onClick={handleOrderClick}>X</button>
                <p>Table {tableNum} Order</p>
                {table.orders.map((order, orderIndex) => (
                    order.order_items.map((item, itemIndex) => (
                        <div className="item-list">
                            {item.name}, ${item.price} &nbsp;
                            <button className="comp-button" data-orderindex={orderIndex} data-itemindex={itemIndex} disabled={order.commped[itemIndex]} onClick={handleRemoveClick}>Comp</button>
                        </div>
                    ))
                ))}
            </Modal>
        </div>
    );
};