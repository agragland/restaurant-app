import React from "react";
import apis from "../../../../api";
import {preparePayment} from "./PaymentView";
import "./OrderView.css"

const sundayNumber = 0;

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

let coupon = 0
export const updateCoupon = (discount) => {
    coupon = discount
}
export const getCoupon = () => {
    return coupon
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
            table: 0,
            coupon: coupon,
            openTime: "",
            closeTime: "",
            canOrder: true
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
    
    handleGetTimes = async() => {
        apis.getTimes().then(times => {
            const curr_times = times.data.data
            curr_times.map((time) => {
                let now = this.getTime(new Date())
                if( now>time.startTime && now<time.endTime){
                    this.setState({canOrder: false});
                }
                else{
                    this.setState({canOrder: true});
                }
            })
        })
        
    };

    getTime = (creationTime) => {
        const time = new Date(creationTime)     //gets Date based on when order was created
        const hours = time.getHours()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        //converts Date to 24 hour clock, adds leading zeros if needed
        return ((hours < 10 ? '0' : '') + hours) + ":" + ((minutes < 10 ? '0' : '') + minutes) + ":" + ((seconds < 10 ? '0' : '') + seconds)
    }


    OrderStatusHandler = () => {
        this.handleGetTimes()
        if(payload.status === 'Waiting')
        {
            return(
                <button disabled={this.state.canOrder} onClick={this.placeOrderHandler}>Place Order</button>
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
        let { items, comments, commped, subtotal  } = this.state

        if(new Date().getDay() === sundayNumber){
            for(let i = 0; i < items.length; i++) {
                if(items[i].category === "entrees"){
                    for(let j = 0; j < items.length; j++) {
                        if(items[j].category === "kids" && commped[j] === false){
                            subtotal -= items[j].price
                            commped[j] = true
                            break;
                        }
                    }
                }
            }
        }

        subtotal -= coupon
        if(subtotal < 0)
            subtotal = 0
        const total = subtotal

        this.setState({subtotal: subtotal})

        const final_payload = { order_items:items, comments, commped, subtotal, total, status:'Created', table:payload.table }
        await apis.createOrder(final_payload).then(res => {
            preparePayment(res.data.id)
        })
    }

    displayCoupon = () => {
        if(this.state.coupon > 0)
            return <p>A coupon of ${this.state.coupon.toFixed(2)} has been added due to your loyalty.</p>
        else
            return <></>
    }

    displaySunday = () => {
        if(new Date().getDay() === sundayNumber)
            return <p>Sunday special! You can receive a free Kids meal for every Entree you purchase.</p>
        else
            return <></>
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
            {this.displayCoupon()}
            {this.displaySunday()}
            <p className="big-text">Subtotal: ${this.state.subtotal.toFixed(2)}</p>
            {this.OrderStatusHandler()}
        </div>

        )
    }

}