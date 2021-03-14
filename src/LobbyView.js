import React, {useState} from 'react';
import Modal from './Modal';

const classicTaco = {name: "Classic Taco", price: 7.99}
const wackyTaco = {name: "Wacky Taco", price: 12.99}

//temporary array for items
const tables = [
    {status: "Occupied", orders: [classicTaco, wackyTaco]}, {status: "Available", orders: []},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]},
    {status: "Occupied", orders: [classicTaco]}, {status: "Occupied", orders: [wackyTaco]}
]

export default function TableModals() {
    const [tableNum, setTableNum] = useState("1");  //the number of the table (1-20)
    const handleSetTableNum = ({target}) => {
        if(target.dataset.index) {                  //ensures index is not undefined
            setTableNum(() => target.dataset.index);
        }
    }

    const [tableShow, setTableShow] = useState(false);
    const handleTableClick = ({target}) => {        //when a table button is clicked
        handleSetTableNum({target})

        if(tableShow === true) {                    //toggles table modal
            setTableShow(() => false);
        }
        else {
            setTableShow(() => true);
        }
    };

    const [orderShow, setOrderShow] = useState(false);
    const handleOrderClick = ({target}) => {        //when the show order button is clicked
        handleSetTableNum({target})

        if(orderShow === true){                     //swaps between Order and Table modals
            setOrderShow(() => false);
            setTableShow(() => true);
        }
        else{
            setTableShow(() => false);
            setOrderShow(() => true);
        }
    };

    const handleCompleteClick = ({target}) => {
        const index = target.dataset.index;
        tables[index].status = "Occupied";

        setTableShow(() => false);
    };

    const handleRemoveClick = ({target}) => {
        tables[target.dataset.table].orders[target.dataset.index].price = 0;
        setOrderShow(() => false);
        setTableShow(() => true);
    };

    return (
        <>
            {tables.map((table, index) => (
                <button data-index={index+1} onClick={handleTableClick}>
                    Table {index+1}
                    <br />
                    {table.status}
                </button>
            ))}
            <Modal show={tableShow}>
                <button onClick={handleTableClick}>X</button>
                <p>
                    Table {tableNum}
                    <button onClick={handleOrderClick}>Show Order</button>
                </p>
                {tables[tableNum-1].orders.map((order) => (
                    <p>{order.name}</p>
                ))}
                <button data-index={tableNum-1} onClick={handleCompleteClick}>Complete Request</button>
            </Modal>
            <Modal show={orderShow}>
                <button onClick={handleOrderClick}>X</button>
                <p>Table {tableNum} Order</p>
                {tables[tableNum-1].orders.map((order, index) => (
                    <p>
                        {order.name}, ${order.price}
                        <button data-table={tableNum-1} data-index={index} onClick={handleRemoveClick}>Remove</button>
                    </p>
                ))}
            </Modal>
        </>
    );
};