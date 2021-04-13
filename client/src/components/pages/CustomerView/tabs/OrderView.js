import React from "react";
import apis from "../../../../api";
import {preparePayment} from "./PaymentView";
import "./OrderView.css"

let payload = {
    items: [],
    comments: [],
    commped: [],
    subtotal: 0.00,
    tip: 0,
    total: 0,
    status: 'Waiting',
    table: 8
}

export const freeDessertOrder = (dessert) =>
{
    
}

export const getItems = () => {
    return payload.items
}

export const updateTableNum = (num) => {
    payload.table = num
}

export const getTableNum = () => {
    return payload.table
}

export const handleAddToOrder = (item, comment) => {
    if(payload.status === 'Waiting')
    {
        payload.items.push(item._id)
        payload.comments.push(comment)
        payload.commped.push(false)
    }
    console.log(payload)
}





export default class OrderView extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            comments: [],
            commped: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            status: '',
            table: 0
        }
    }

    componentDidMount = async () =>{
        payload.items.map((item, index) => {
            apis.getItemById(item).then(item_info => {
                this.setState(prevState => ({
                    items: [...prevState.items, item_info.data.data],
                    comments: [...prevState.comments,payload.comments[index]],
                    commped: [...prevState.commped,payload.commped[index]],
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
        let comms = [...this.state.comments]
        let comp = [...this.state.commped]
        let index = arr.indexOf(item)
        if(index !== -1)
        {
            arr.splice(index,1)
            comms.splice(index,1)
            comp.splice(index,1)
            payload.items.splice(payload.items.indexOf(item._id),1)
            payload.comments.splice(payload.items.indexOf(item._id),1)
            payload.commped.splice(payload.items.indexOf(item._id), 1)
            this.setState(prevState => ({
                items: arr,
                comments: comms,
                commped: comp,
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
                <p className="big-text">Order Placed!</p>
            )
        }

    }

    OrderItem = ({item, comment, comp}) => {
        if(comp)
        {
            return (
                <div>
                    {item.name} $0.00
                    &nbsp;
                    {comment}
                    &nbsp;
                    {this.EditRemoveButtons(item)}
                </div>
            )
        }
        return (
            <div>
                {item.name} ${item.price}
                &nbsp;
                {comment}
                &nbsp;
                {this.EditRemoveButtons(item)}
            </div>
        )


    }

    EditRemoveButtons = (item_test) => {
        console.log(payload.status)
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
        const { items, comments, commped, subtotal, total,  } = this.state
        const final_payload = { order_items:items, comments, commped, subtotal, total, status:'Created', table:payload.table }
        await apis.createOrder(final_payload).then(res => {
            preparePayment(res.data.id)
        })
    }


    render() {
    return(
        <div className="order-container">
            <h1>Your Order</h1>
            <div>
                {this.state.items.map((item_test,index) => (
                    <div>
                        <this.OrderItem key={index} item={item_test} comment={this.state.comments[index]} comp={this.state.commped[index]} />
                    </div>
                ))
                }
            </div>
            <p className="big-text">Subtotal: ${this.state.subtotal.toFixed(2)}</p>
            {this.OrderStatusHandler()}
        </div>

        )
    }

}