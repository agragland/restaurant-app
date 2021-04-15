import React from "react";
import apis from "../../../../api";
import {preparePayment} from "./PaymentView";
import "./OrderView.css"

const sundayNumber = 0;     //value for checking if sunday. Sunday = 0, Monday = 1, etc.

//payload corresponding to an order
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

//gets items from database
export const getItems = () => {
    return payload.items
}

//updates table in database
export const updateTableNum = (num) => {
    payload.table = num
}

//gets table number from the payload
export const getTableNum = () => {
    return payload.table
}

//adds an item to the order payload
export const handleAddToOrder = (item, comment) => {
    if(payload.status === 'Waiting')
    {
        payload.items.push(item._id)
        payload.comments.push(comment)
        payload.commped.push(false)
    }
    console.log(payload)
}

//coupon handling, for the loyalty system
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
            //corresponds to the order model
            items: [],
            comments: [],
            commped: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            status: '',
            table: 0,

            openTime: "",   //opening time for the store
            closeTime: "",  //closing time for the store
            canOrder: true  //boolean for if the customer can order, based on opening/closing times
        }
    }

    componentDidMount = async () =>{
        //gets items in the payload from the database and adds them to the state
        payload.items.map((item, index) => {
            apis.getItemById(item).then(item_info => {
                this.setState(prevState => ({
                    items: [...prevState.items, item_info.data.data],
                    comments: [...prevState.comments,payload.comments[index]],
                    commped: [...prevState.commped,payload.commped[index]],
                    subtotal: prevState.subtotal + item_info.data.data.price
                }))
                //updates subtotal and total
                this.setState({
                    tax: this.state.subtotal * 0.0825,
                    total: this.state.subtotal * 1.0825,
                })
            })
        })
    }

    //if the customer removes an item from their order
    handleRemoveFromOrder = (item) => {
        //temp variables corresponding to states
        let arr = [...this.state.items]
        let comms = [...this.state.comments]
        let comp = [...this.state.commped]

        let index = arr.indexOf(item)
        if(index !== -1)
        {
            //remove item from items, comments, and comped arrays from temps
            arr.splice(index,1)
            comms.splice(index,1)
            comp.splice(index,1)

            //also removes from payload
            payload.items.splice(payload.items.indexOf(item._id),1)
            payload.comments.splice(payload.items.indexOf(item._id),1)
            payload.commped.splice(payload.items.indexOf(item._id), 1)

            //set states
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

    //gets opening/closing times from database
    handleGetTimes = async() => {
        apis.getTimes().then(times => {
            const curr_times = times.data.data

            curr_times.map((time) => {  //iterates over every time (though there should only be one)
                let now = this.getTime(new Date())  //the current time

                if( now>time.startTime && now<time.endTime){    //if between opening and closing
                    this.setState({canOrder: false});      //allow the customer to order
                }
                else{                                           //else
                    this.setState({canOrder: true});       //disable the order button
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

    //returns the order button if the status of the order is waiting
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

    //displays the item in the order, displaying the price as "$0.00" if the item was comped
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

    //returns a button to remove and item from the order, if the order hasn't been sent
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

    //handles the "Place order" button
    placeOrderHandler = async () => {
        //update order status
        payload.status = 'Created'
        this.setState({status: 'Created'})

        //corresponds to order model
        let { items, comments, commped, subtotal  } = this.state

        if(new Date().getDay() === sundayNumber){               //if sunday
            for(let i = 0; i < items.length; i++) {             //iterate over every item in the order
                if(items[i].category === "entrees"){            //if the order is an entree
                    for(let j = 0; j < items.length; j++) {     //iterate over every item in the order
                        if(items[j].category === "kids" && commped[j] === false){   //if the item is a kids meal and not comped
                            subtotal -= items[j].price      //change subtotal
                            commped[j] = true               //add to comped array
                            break;          //break, so as to not comp too many items
                        }
                    }
                }
            }
        }

        subtotal -= coupon  //adds loyalty coupon
        if(subtotal < 0)    //ensures we are not giving them money for buying something
            subtotal = 0
        const total = subtotal * 1.0825 //updates total
        this.setState({subtotal: subtotal, total: total})

        //set a new, final, payload
        const final_payload = { order_items:items, comments, commped, subtotal, total, status:'Created', table:payload.table }
        //update the database
        await apis.createOrder(final_payload).then(res => {
            preparePayment(res.data.id)
        })
    }

    //displays the description of the coupon, if it exists
    displayCoupon = () => {
        if(coupon > 0)
            return <p>A coupon of ${coupon.toFixed(2)} has been added due to your loyalty.</p>
        else
            return <></>
    }

    //displays the description of the Sunday special, if it is Sunday
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