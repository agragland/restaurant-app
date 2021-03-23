import React, { useState } from 'react';
import './KitchenView.css'

const globalOrderQueue = [
    {name: "Classic Taco", price: 7.99, table: 17},
    {name: "Wacky Taco", price: 12.99, table: 1},
    {name: "Wacky Taco", price: 12.99, table: 15},
    {name: "Wacky Taco", price: 12.99, table: 16}
]

export default function KitchenView (){
    const [orderQueue, setOrderQueue] = useState(globalOrderQueue);
    const [actives, setActives] = useState([]);

    const clickToActive = ({target}) => {
        const index = target.value
        setActives((prev) => prev.concat(orderQueue[index]))
        let temp = [...orderQueue]
        temp.splice(index, 1)
        setOrderQueue(() => temp)
    }

    const clickToReady = ({target}) => {
        const index = target.value
        let temp = [...actives]
        temp.splice(index, 1)
        setActives(() => temp)
    }

    return (
        <div className='kitchen'> 
            <p className='kitchen-title'>Kitchen</p>
            <section className="order-queue">
                <h1 className="queue-title">Queue</h1>
                {orderQueue.map((order, index) => (
                    <p>
                        <button value={index} className="queue-button" onClick={clickToActive}>Table {order.table}</button>
                    </p>
                ))}
            </section>
            <section className="active-orders">
                <h1>Active</h1>
                {actives.map((order, index) => (
                    <p>
                        <button value={index} className="queue-button" onClick={clickToReady}>Table {order.table}</button>
                    </p>
                ))}
            </section>
        </div>
    );
}