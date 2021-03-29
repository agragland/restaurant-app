import React, {useState, useEffect} from "react";
import apis from "../../../../api";
const mongoose = require('mongoose');

let payload = {
    items: [],
    comments: [],
    subtotal: 0.00,
    tip: 0,
    total: 0,
    status: 'Waiting',
    table: 20
}



export const updateTableNum = (num) => {
    payload.table = num
}

export const handleAddToOrder = (item) => {
    if(payload.status === 'Waiting')
    {
        payload.items.push(item._id)
    }
}

const OrderItem = ({item}) => {
    return (
        <div>
            <p>{item.name} {item.price}</p>
        </div>
    )

}



export default class OrderView extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            comments: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            status: '',
            table: 0
        }
    }

    componentDidMount = async () =>{
        payload.items.map((item) => {
            apis.getItemById(item).then(item_info => {
                this.setState(prevState => ({
                    items: [...prevState.items, item_info.data.data],
                    subtotal: prevState.subtotal + item_info.data.data.price
                }))
                this.setState({
                    tax: this.state.subtotal * 0.0825,
                    total: this.state.subtotal * 1.0825,
                })
            })
        })
    }

    handleRemoveFromOrder = (item) => {
        let arr = [...this.state.items]
        let index = arr.indexOf(item)
        if(index !== -1)
        {
            arr.splice(index,1)
            payload.items.splice(payload.items.indexOf(item._id),1)
            this.setState(prevState => ({
                items: arr,
                subtotal: prevState.subtotal - item.price
            }))
            this.setState(prevState => ({
                tax: prevState.subtotal * 0.0825,
                total: prevState.subtotal * 1.0825
            }))
        }

    }

    OrderStatusHandler = () => {

        if(payload.status === 'Waiting')
        {
            return(
                <button onClick={this.placeOrderHandler}>Place Order</button>
            )
        }
        else if(payload.status === 'Created')
        {
            return(
                <h1>Order Placed! Please Wait...</h1>
            )
        }

    }

    EditRemoveButtons = (item_test) => {
        if(payload.status === 'Waiting')
        {
            return(
                <button onClick={() => this.handleRemoveFromOrder(item_test)}>X</button>
            )
        }
        else if(payload.status === 'Created')
        {
            return null;
        }
    }

    placeOrderHandler = async () => {
        //set up order payload and submit
        payload.status = 'Created'
        this.setState({status: 'Created'})
        const { items, comments, subtotal, total,  } = this.state
        const final_payload = { order_items:items, comments, subtotal, total, status:'Created', table:payload.table }
        await apis.createOrder(final_payload).then(res => {
            window.alert(`Order created successfully`)
        })
    }


    render() {
    return(
        <div>
            <h1>Your Order</h1>
            <div>
                {this.state.items.map((item_test,index) => (
                    <div>
                    <OrderItem key={index} item={item_test} />
                        {this.EditRemoveButtons(item_test)}
                    </div>
                ))
                }
            </div>
            <h1>Subtotal {this.state.subtotal.toFixed(2)}</h1>
            <h1>Tax {this.state.tax.toFixed(2)}</h1>
            <h1>Total {this.state.total.toFixed(2)}</h1>
            {this.OrderStatusHandler()}
        </div>

        )
    }

}