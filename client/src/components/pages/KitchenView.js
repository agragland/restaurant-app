import React, {useState, useEffect} from 'react';
import './KitchenView.css'
import api from "../../api";

export default function KitchenView (){
    const [orderQueue, setOrderQueue] = useState([]);       //array of orders in the inactive queue
    const [actives, setActives] = useState([]);             //array of orders in the active list
    const [itemWorking, setItemWorking] = useState([[]]);   //array for checking if an item is done

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
            console.log(curr_orders)
            let tempActives = []
            let tempQueue = []
            let tempWorking = []
            let tempItemWorking = []

            curr_orders.map((order) => {
                if (order.status === "Created") {
                    tempQueue = [...tempQueue, order]           //adds orders to the inactive queue
                }
                else if (order.status === "Cooking") {
                    tempActives = [...tempActives, order]       //adds orders to active list
                    order.order_items.map(() => {
                        tempWorking = [...tempWorking, "working"]   //adds "working" to itemWorking, equal to the number of items in each order
                    })
                    tempItemWorking = [...tempItemWorking, tempWorking]
                    tempWorking = []
                }

            })

            //set states to temps
            setActives(tempActives)
            setOrderQueue(tempQueue)
            setItemWorking(tempItemWorking)
        })
    }

    const handleUpdateOrder = async (payload) => {
        await api.updateOrder(payload._id, payload)
    }

    const clickToActive = ({target}) => {
        //adds order to active
        const index = target.value
        orderQueue[index].status = "Cooking"
        setActives((prev) => prev.concat(orderQueue[index]))

        //updates database
        handleUpdateOrder(orderQueue[index])

        //removes order from inactive
        let temp = [...orderQueue]
        temp.splice(index, 1)
        setOrderQueue(() => temp)
    }

    const clickToReady = ({target}) => {
        const index = target.value
        actives[index].status = "Ready"

        //updates database
        handleUpdateOrder(actives[index])

        //removes order from active
        let temp = [...actives]
        temp.splice(index, 1)
        setActives(() => temp)

        //removes corresponding itemWorking array
        let tempWorking = [...itemWorking]
        tempWorking.splice(index, 1)
        setItemWorking(() => tempWorking)
    }

    const clickItem = ({target}) => {
        let tempArr = [...itemWorking]
        const activesIndex = target.dataset.activesindex
        const itemIndex = target.dataset.itemindex

        //toggles between working and done
        if(tempArr[activesIndex][itemIndex] === "working")
            tempArr[activesIndex][itemIndex] = "done"
        else
            tempArr[activesIndex][itemIndex] = "working"
        setItemWorking(() => tempArr);
    }

    const giveItemWorking = (activesIndex, itemIndex) => {
        //if itemWorking isn't empty, give the working/done button
        if(itemWorking)
            if(itemWorking[activesIndex])
                if(itemWorking[activesIndex][itemIndex])
                    return(<button onClick={clickItem} data-activesindex={activesIndex} data-itemindex={itemIndex} className={itemWorking[activesIndex][itemIndex]}>&nbsp;</button>)
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
                        {order.order_items.map((item, itemIndex) => (
                            <div className="item">
                                <p className="item-name">
                                    {/*giveItemWorking(activesIndex, itemIndex)*/}
                                    &emsp;&nbsp;
                                    {item.name}
                                </p>
                                <p className="item-comments">&emsp;&emsp;-{actives[activesIndex].comments[itemIndex]}</p>
                                <br/>
                            </div>
                        ))}
                        <br/>
                        <button value={activesIndex} className="ready-button" onClick={clickToReady}>Ready</button>
                    </section>
                ))}
            </section>
        </div>
    );
}