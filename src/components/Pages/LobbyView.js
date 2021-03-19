import React, {useState} from 'react';
import Modal from '../Modal';
import './LobbyView.css';

const classicTaco = {name: "Classic Taco", price: 7.99}
const wackyTaco = {name: "Wacky Taco", price: 12.99}
const available = {status: "Available", orders: [], drinks: []}

//temporary array for items
const globalTables = [
    {status: "Refill", orders: [classicTaco, wackyTaco], drinks: ["Taco Juice", "Taco Water"]},
    {status: "Help", orders: [wackyTaco], drinks: []}, {status: "Order Ready", orders: [classicTaco], drinks: []},
    {status: "Occupied", orders: [classicTaco], drinks: []}, available, available,  available, available, available,
    available, available, available, available, available, available, available, available, available, available,
    available,
]

export default function TableView() {
    const [tables, setTables] = useState(globalTables)
    const [tableNum, setTableNum] = useState("1");  //the number of the table (1-20)
    const [table, setTable] = useState({status: "Available", orders: []});
    const handleSetTableVals = ({target}) => {
        if (target.dataset.index) {                  //ensures index is not undefined
            setTableNum(() => target.dataset.index);
            setTable(() => tables[target.dataset.index - 1]);
        }
    }

    const [tableShow, setTableShow] = useState(false);
    const handleTableClick = ({target}) => {        //when a table button is clicked
        handleSetTableVals({target})

        if(tableShow === true) {                    //toggles table modal
            setTableShow(() => false);
        }
        else {
            setTableShow(() => true);
        }
    };

    const [orderShow, setOrderShow] = useState(false);
    const handleOrderClick = ({target}) => {        //when the show order button is clicked
        handleSetTableVals({target})

        if(orderShow === true){                     //swaps between Order and Table modals
            setOrderShow(() => false);
            setTableShow(() => true);
        }
        else{
            setTableShow(() => false);
            setOrderShow(() => true);
        }
    };

    const handleCompleteClick = () => {
        table.status = "Occupied";
        //needs to actually set stuff in the data as well
        setTableShow(() => false);
    };

    const handleRemoveClick = ({target}) => {
        table.orders[target.dataset.index].price = 0;
        setOrderShow(() => false);
        setTableShow(() => true);
    };

    function Needs({tableNum}) {
        if(!tableNum)
            return <></>

        const table = tables[tableNum - 1];
        if (table.status === "Refill") {
            return (
                <div>
                    Refill requested for:
                    {table.drinks.map((drink) => (
                        <p>{drink}</p>
                    ))}
                </div>
            );
        }
        if (table.status === "Help") {
            return(
                <div>
                    <p>Wait staff requested.</p>
                </div>
            );
        }
        if (table.status === "Ready") {
            return(
                <div>
                    <p>Order ready to be delivered.</p>
                </div>
            )
        } else
            return null;
    }

    let tableColor = "black";

    function setColor(curTable) {
        if(curTable !== undefined) {
            const curStatus = curTable.status

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
            <p class="lobby-title">Lobby</p>
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
                <button class='orderButton' onClick={handleOrderClick} disabled={!table.orders[0]} >Show Order</button>
                <p style={{ fontSize: '1.25rem', textAlign: 'center'}}></p>
                <p>
                    Table {tableNum}
                </p>
                <Needs tableNum={tableNum}/>
                <button onClick={handleCompleteClick} disabled={table.status === "Available" || table.status === "Occupied"}>Complete Request</button>
            </Modal>
            <Modal show={orderShow}>
                <button onClick={handleOrderClick}>X</button>
                <p>Table {tableNum} Order</p>
                {table.orders.map((order, index) => (
                    <p>
                        {order.name}, ${order.price}
                        <button data-index={index} onClick={handleRemoveClick}>Remove</button>
                    </p>
                ))}
            </Modal>
        </div>
    );
};