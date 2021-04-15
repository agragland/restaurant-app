import React, {useState, useEffect} from 'react';
import './KitchenView.css'
import Clock from 'react-live-clock'
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

    const refresh = () => {
        handleGetOrders()
    }

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

    const handleUpdateOrder = async (payload) => {      //updates order in database
        await api.updateOrder(payload._id, payload)
    }
    const handleUpdateTable = async (table_num) => {    //updates table in database
        await api.updateTable(table_num, {table_num: table_num, status: "Order Ready", refills: [], assistance: false})
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
        handleUpdateTable(actives[index].table)

        //removes order from active
        let temp = [...actives]
        temp.splice(index, 1)
        setActives(() => temp)

        //removes corresponding itemWorking array
        let tempWorking = [...itemWorking]
        tempWorking.splice(index, 1)
        setItemWorking(() => tempWorking)
    }

    const getTime = (creationTime) => {
        const time = new Date(creationTime)     //gets Date based on when order was created
        const hours = time.getHours()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        //converts Date to 24 hour clock, adds leading zeros if needed
        return ((hours < 10 ? '0' : '') + hours) + ":" + ((minutes < 10 ? '0' : '') + minutes) + ":" + ((seconds < 10 ? '0' : '') + seconds)
    }

    return (
        <div className='kitchen'>
            <div>
                <h1 className='kitchen-title'> Kitchen</h1>   
                <div style={{ position: 'fixed', marginTop: '10px;', marginLeft: '70%', zIndex: '2'}}>
                    <p style={{ textAlign: 'center', outline: 'black solid 3px', height: '2rem', width: '16rem', backgroundColor: 'gray', fontSize: '18px', color: 'black' }}>Current Time: {''}
                    <Clock style={{ fontSize: '16px', color: 'black' }} format={'HH:mm:ss'} ticking={true} timezone={'US/Central'} />
                    </p>
                </div>
            </div>
            <button className="refresh" onClick={refresh}>Refresh</button>
            <section className="order-queue">
                <h2 className="queue-title">Queue</h2>
                {orderQueue.map((order, index) => (
                    <p>
                        <button value={index} className="queue-button" onClick={clickToActive}>
                            Table {order.table}
                            <br/>
                            {getTime(order.createdAt)}
                        </button>
                    </p>
                ))}
            </section>
            <section className="active-orders">
                <h2 style={{ fontSize: '36px' }}>Active</h2>
                {actives.map((order, activesIndex) => (
                    <section className="order">
                        <h3 className="order-table">Table {order.table}</h3>
                        {order.order_items.map((item, itemIndex) => (
                            <div className="item">
                                <p className="kchn-item-name">
                                    &emsp;&nbsp;
                                    {item.name}
                                </p>
                                <p className="item-comments">&emsp;&emsp;-{actives[activesIndex].comments[itemIndex]}</p>
                                <br/>
                            </div>
                        ))}
                        <br/>
                        <p className="order-time">{getTime(order.createdAt)}</p>
                        <button value={activesIndex} className="ready-button" onClick={clickToReady}>Ready</button>
                    </section>
                ))}
            </section>
        </div>
    );
}