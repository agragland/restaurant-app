import React, {useState} from 'react';
import './KitchenView.css'

const globalOrderQueue = [
    {comments: ["No shell", "Extra shell"], table: 17, status: "Created", items: [{name: "Classic Taco", price: 7.99}, {name: "Wacky Taco", price: 12.99}]},
    {comments: ["", "help :)"], table: 1, status: "Created", items: [{name: "Classic Taco", price: 7.99}, {name: "Wacky Taco", price: 12.99}]},
    {comments: ["Make it cheaper"], table: 10, status: "Created", items: [{name: "Wacky Taco", price: 12.99}]},
    {comments: ["Classic."], table: 15, status: "Created", items: [{name: "Classic Taco", price: 7.99}]}
]
const globalActive = [];

export default function KitchenView (){
    const [orderQueue, setOrderQueue] = useState(globalOrderQueue);
    const [actives, setActives] = useState(globalActive);
    const [itemOrder, setItemOrder] = useState([["working", "working"], ["working", "working"], ["working"], ["working"]]);

    const clickToActive = ({target}) => {
        const index = target.value
        orderQueue[index].status = "Cooking"
        setActives((prev) => prev.concat(orderQueue[index]))
        let temp = [...orderQueue]
        temp.splice(index, 1)
        setOrderQueue(() => temp)
    }

    const clickToReady = ({target}) => {
        const index = target.value
        actives[index].status = "Ready"
        let temp = [...actives]
        temp.splice(index, 1)
        setActives(() => temp)
    }

    const clickItem = ({target}) => {
        let tempArr = [...itemOrder]
        const activesIndex = target.dataset.activesindex
        const itemIndex = target.dataset.itemindex

        if(tempArr[activesIndex][itemIndex] === "working")
            tempArr[activesIndex][itemIndex] = "done"
        else
            tempArr[activesIndex][itemIndex] = "working"
        setItemOrder(() => tempArr);
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
                {actives.map((order, activesIndex) => (
                    <section className="order">
                        <h3 className="order-table">Table {order.table}</h3>
                        {order.items.map((item, itemIndex) => (
                            <div className="item">
                                <p className="item-name">
                                    <button onClick={clickItem} data-activesindex={activesIndex} data-itemindex={itemIndex} className={itemOrder[activesIndex][itemIndex]}>&nbsp;</button>
                                    {item.name}
                                </p>
                                <p className="item-comments">&emsp;&emsp;-{actives[activesIndex].comments[itemIndex]}</p>
                                <br/>
                            </div>
                        ))}
                        <button value={activesIndex} className="ready-button" onClick={clickToReady}>Ready</button>
                    </section>
                ))}
            </section>
        </div>
    );
}