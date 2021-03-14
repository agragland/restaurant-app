import React, {useState} from 'react';
import './LobbyView.css';

/*const tables = [
    "Table 1",  "Table 2",  "Table 3",  "Table 4",  "Table 5",  "Table 6",  "Table 7",  "Table 8",  "Table 9",
    "Table 10", "Table 11", "Table 12", "Table 13", "Table 14", "Table 15", "Table 16", "Table 17", "Table 18",
    "Table 19", "Table 20"
]*/

//temporary array for items
const tables = [
    {name: "Classic Taco", price: 7.99}, {name:"Wacky Taco", price: 12.99}, {name: "Classic Taco", price: 7.99},
    {name:"Wacky Taco", price: 12.99}, {name: "Classic Taco", price: 7.99}, {name:"Wacky Taco", price: 12.99},
    {name: "Classic Taco", price: 7.99}, {name:"Wacky Taco", price: 12.99}, {name: "Classic Taco", price: 7.99},
    {name:"Wacky Taco", price: 12.99}, {name: "Classic Taco", price: 7.99}, {name:"Wacky Taco", price: 12.99},
    {name: "Classic Taco", price: 7.99}, {name:"Wacky Taco", price: 12.99}, {name: "Classic Taco", price: 7.99},
    {name:"Wacky Taco", price: 12.99}, {name: "Classic Taco", price: 7.99}, {name:"Wacky Taco", price: 12.99},
    {name: "Classic Taco", price: 7.99}, {name:"Wacky Taco", price: 12.99}
]

//Uses custom-made modal, since there's a strange flashing that happens when changing bootstrap modals
const Modal = ({show, children}) => {
    if (!show)
        return null;

    return (
        <div className="modal">
            <section className="modal-main">
                {children}
            </section>
        </div>
    );
}

export default function TableModals() {
    const [tableNum, setTableNum] = useState("-1");                 //the number of the table (1-20)
    const [order, setOrder] = useState({name: "-1", price: "-1"});  //the name and price of menu item

    const tableSets = ({target}) => {
        if(target.dataset.index && target.dataset.name && target.dataset.price) {       //ensures nothing is undefined
            setTableNum(() => target.dataset.index);
            setOrder(() => ({
                name: target.dataset.name,
                price: target.dataset.price
            }));
        }
    }

    const [tableShow, setTableShow] = useState(false);
    const handleTableClick = ({target}) => {        //when a table button is clicked
        tableSets({target})

        if(tableShow === true) {                    //toggles table modal
            setTableShow(() => false);
        }
        else {
            setTableShow(() => true);
        }
    };

    const [orderShow, setOrderShow] = useState(false);
    const handleOrderClick = ({target}) => {        //when the show order button is clicked
        tableSets({target})

        if(orderShow === true){                     //swaps between Order and Table modals
            setOrderShow(() => false);
            setTableShow(() => true);
        }
        else{
            setTableShow(() => false);
            setOrderShow(() => true);
        }
    };

    return (
        <>
            {tables.map((order, index) => (
                <button data-price={order.price} data-name={order.name} data-index={index+1} onClick={handleTableClick}>
                    Table {index+1}
                </button>
            ))}
            <Modal show={tableShow}>
                <button onClick={handleTableClick}>X</button>
                <p>
                    Table {tableNum}
                    <button onClick={handleOrderClick}>Show Order</button>
                </p>
                <p>{order.name}</p>
                <button onClick={handleTableClick}>Complete Request</button>
            </Modal>
            <Modal show={orderShow}>
                <button onClick={handleOrderClick}>X</button>
                <p>Table {tableNum} Order</p>
                <p>
                    {order.name}, {order.price}
                    <button>Remove</button>
                </p>
            </Modal>
        </>
    );
};