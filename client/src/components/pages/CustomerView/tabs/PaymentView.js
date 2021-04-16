import React, {useState} from "react"
import apis from "../../../../api"
import Modal from "../../../Modal"
import "./PaymentView.css"
import api from "../../../../api";
import {getTableNum, getCoupon} from "./OrderView";

let payload = {
    order_id: '',
    paymentReady: false,
}

export const preparePayment = (id) => {
    payload.order_id = id
    payload.paymentReady = true
}

const PaymentItem = ({item, comp}) => {
    //displays item and shows price as "$0.00" if the item is comped
    if(comp)
    {
        return (
            <div>
                <p>{item.name} 0.00</p>
            </div>
        )
    }
    return (
        <div>
            <p>{item.name} {item.price}</p>
        </div>
    )
}

let menu_items = []
export default class PaymentView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order_id: '',           //id of order in the db
            order: {},              //order from the db
            paymentReady: false,    //if the customer can pay
            cardModal: false,       //modal for "pay with card"
            paymentModal: 0,        //modal for tip, insert card, free dessert chance, etc.
            freeDessert: 0,         //if the customer gets a free dessert
            customTip: 0,           //value of the custom tip
            customItem: false,      //if the item has comments
            splitNum: 1,            //the number of times the bill is being split
            splitCheck: false,      //if the bill is being split
            splitTotal: 0,           //the total price per bill split
            hasPayed: false
        }
    }

    componentDidMount = async () => {
        //gets the order from the db
        await apis.getOrder(payload.order_id).then(order =>{
            if(order.data.data.status === 'Delivered')
            {
                //updates state
                this.setState({
                    order: order.data.data,
                    paymentReady: true,
                    paymentModal: 0
                })
            }
        }).catch(err => {
            this.setState({
                paymentReady: false,
                paymentModal: 0
            })
        })

        this.handleGetItems()   //gets items from db
        console.log(this.state)
    }

    //gets all items from the db
    handleGetItems = async () => {
        await api.getAllItems().then(items => {
            menu_items = items.data.data
        })

        console.log(menu_items)
    }

    //updates order in db
    handleUpdateOrder = async (payload) => {
        await api.updateOrder(payload._id, payload)
    }

    //sends the free dessert, if the customer wins it
    orderFreeDessert = async (item, comments) => {
        //set up order payload and submit
        const final_payload = { order_items: [item], comments, commped: [true], subtotal: 0, total: 0, status:'Created', table:getTableNum() }
        //creates the order
        await apis.createOrder(final_payload).then(res => {
            window.alert(`Order created successfully`)
            preparePayment(res.data.id)
        })
    }

    //displays info for the item, and displays a modal if customer wants to add comments
    Item = ({item}) => {
        let comment = ""

        const handleCommentField = (e) => {
            comment = e.target.value
        }

        return(
            <>
            <Modal show={this.customItem}>
            <button onClick={() => this.setState(prevState => ({customItem: !prevState.customItem}))} className="x-button">X</button>
            <div>
                <p className="item-name">{item.name}</p>
                <p>${item.price}</p>
                <ul>
                    {item.ingredients.map((ingredient, index) =>
                        <li key={index}>{ingredient}</li>
                    )}
                </ul>
                <form>
                    <label>Comments:</label>
                    <input type = "text" title="comments" onChange={handleCommentField}/>
                </form>
                <button onClick={() => {
                    this.orderFreeDessert(item, comment);
                    this.setState(prevState => ({customItem: !prevState.customItem}))
                    this.setState(prevState => ({cardModal: !prevState.cardModal}))
                }}>Add to Order</button>

            </div>
            </Modal>
            <div className={"item-display"}>
                <div>
                    <p className="item-name">{item.name}</p>
                    <p>${item.price}</p>
                    <ul>
                        {item.ingredients.map((ingredient, index) =>
                            <li key={index}>{ingredient}</li>
                        )}
                    </ul>
                    <button onClick={() => {
                        this.orderFreeDessert(item, "")
                        this.setState(prevState => ({cardModal: !prevState.cardModal}))
                    }}>Add to Order</button>
                    &nbsp;
                    <button onClick={() => this.setState(prevState => ({customItem: !prevState.customItem}))}>Customize</button>
                </div>
            </div>
            </>
        )
    }

    //checks if the bill is finished repeating, based on splitNum
    continueSplit = () => {
        //if no more repeats necessary
        if(this.state.splitNum === 1) {
            this.setState({paymentModal: 3})     //go to chance for free dessert
        }
        //if needs more repeats
        else {
            this.setState(prevState => ({
                splitNum: prevState.splitNum-1,     //decrements splitNum
                splitTotal: prevState.splitTotal-prevState.order.tip    //resets spitTotal
            }))
            this.setState({paymentModal: 1})     //go to insert card
        }
    }

    //displays the modal for paying with card, selecting tip, amount paid, and free dessert chance
    cardModal = () =>
    {
        if (this.state.paymentModal === 0) {             //insert ccard
            return (
                <Modal show={this.state.cardModal}>
                    <p>Please insert Card</p>
                    <button onClick={() => {
                        this.setState({paymentModal: 1})
                    }}>Insert Card
                    </button>
                </Modal>
            )
        } else if (this.state.paymentModal === 1) {      //selecting tip
            return (
                <Modal show={this.state.cardModal}>
                    <h1>Select your tip</h1>
                    <button onClick={() => {
                        this.tipHandler(0.1)
                    }}>10% tip
                    </button>
                    <button onClick={() => {
                        this.tipHandler(0.15)
                    }}>15% tip
                    </button>
                    <button onClick={() => {
                        this.tipHandler(0.2)
                    }}>20% tip
                    </button>
                    <br/>
                    <input type='number' title="custom tip" className="payment-input" value={this.state.customTip} onChange={this.handleCustomTipValue}/>
                    <button onClick={() => {
                        this.tipHandler(this.state.customTip / 100)
                    }}>Submit Custom Tip
                    </button>
                </Modal>
            )
        } if (this.state.paymentModal === 2) {           //amount paid
            return (
                <Modal show={this.state.cardModal}>
                    <h1>You Paid ${this.state.splitTotal.toFixed(2)}</h1>
                    <button onClick={this.continueSplit}>Continue</button>
                </Modal>
            )
        } else if (this.state.paymentModal === 3) {      //free dessert chance
            return (
                <Modal show={this.state.cardModal}>
                    <h1>Time for a chance to win a free dessert!</h1>
                    {this.freeDessertHandler()}
                </Modal>
            )
        }
    }

    /*
    *********
    DESSERT HANDLING
    *********
    */
    //displays chance for free dessert, and displays free dessert selection if they win or consolation if they didn't win
    freeDessertHandler = () => {
        let temp = this.state.order
        temp.status = "Paid"
        //updates order in db to be paid
        this.handleUpdateOrder(temp)

        if(this.state.freeDessert === 0)        //before chance is taken
        {
            return(
                <button onClick={this.dessertRandomizer}>Click for a chance to win!</button>
            )
        }
        else if(this.state.freeDessert === 1)   //if customer wins
        {
            return(
                <>
                <h1>Congrats! You Won!</h1>
                <h1>Please select a dessert from the list below!</h1>
                    {
                        menu_items.map((item, index) => {
                            if(item.category === 'desserts')
                            {
                                return(<this.Item
                                    key={index}
                                    item={item}
                                />)
                            }
                            else
                                return null;
                        })
                    }
                </>
            )
        }
        else if(this.state.freeDessert === 2)   //if customer loses
        {
            return(
                <>
                    <h1>Sorry! You Did Not Win!</h1>
                    <h1>Thanks for Visiting Taco Palace</h1>
                    <button onClick={this.cardPaymentHandler}>Complete Order</button>
                </>
            )
        }
    }

    //rng
    dessertRandomizer = () => {
        this.setState({hasPayed: true})
        if(Math.random() <= 0.33)       //1/3 chance (roughly) to win
        {
            this.setState({freeDessert: 1})
        }
        else                            //2/3 chance (roughly) to lose
        {
           this.setState({freeDessert: 2})
        }
    }

    /*
    *********
    TIP HANDLING
    *********
    */
    //updates total based on tip
    tipHandler = async (tipPerc) => {
        let temp = this.state.order     //temp variable based on state
        temp.tip = this.state.splitTotal * tipPerc  //updates tip based on customer input
        temp.total += temp.tip          //updates total based on tip

        //updates state
        this.setState(prevState => ({order: temp, splitTotal: prevState.splitTotal+temp.tip}))
        //go to next step in payment
        this.setState({paymentModal: 2})

        console.log(this.state)
    }

    //handles custom tip value from customer
    handleCustomTipValue = (e) => {
        this.setState({     //updates state
            customTip: e.target.value
        })
    }

    //handles change in splitNum based on customer input
    handleChangeSplit = (e) => {
        this.setState({
            splitNum: Math.ceil(e.target.value)     //updates state, ensuring number is an integer
        })
    }

    //toggles splitCheck bool
    handleClickSplit = () => {
        this.setState(prevState => ({splitCheck: !prevState.splitCheck}))
    }

    //toggles cardModal, turns splitCheck Modal off, and updates splitNum
    cardPaymentHandler = () =>
    {
        this.setState(prevState => ({
            cardModal: !prevState.cardModal, splitCheck: false,
            splitTotal: prevState.order.total/prevState.splitNum
        }))
    }

    /*
    *********
    Pay Cash Handling
    *********
    */
    //returns value of current table
    handleGetTable = async () => {
        return await api.getTableByNum(getTableNum())
    }
    //updates database with a new table
    handleUpdateTable = async (table) => {
        await api.updateTable(table.table_num, table)
    }
    handleClickCash = () => {
        //update table to notify lobby of take home box request
        this.handleGetTable().then((table) => {
            this.setState({paymentModal: 3})
            this.setState({cardModal: true})
            let new_table = table.data.data
            new_table.payCash = true
            this.handleUpdateTable(new_table)
        })
    }

    //displays based on if the order is delivered
    paymentStatusHandler = () => {
        if(!this.state.paymentReady)    //order not delivered
        {
            return (
                <>
                <p className="big-text">Can't pay yet, you don't have an order delivered!</p>
                </>
            )
        }
        else    //order is delivered
        {
            return (
                <div>
                    {this.state.order.order_items.map((item_test,index) => (
                        <div>
                            <PaymentItem key={index} item={item_test} comp={this.state.order.commped[index]} />
                        </div>
                    ))
                    }
                    <p className="big-text">Subtotal: {this.state.order.subtotal.toFixed(2)}</p>
                    <p className="big-text">Tax: {(this.state.order.subtotal * 0.0825).toFixed(2)}</p>
                    <p className="big-text">Total: {this.state.order.total.toFixed(2)}</p>
                    <button disabled={this.state.hasPayed} onClick={this.cardPaymentHandler}>Pay with Card</button>
                    <button disabled={this.state.hasPayed} onClick={this.handleClickCash}>Pay with Cash</button>
                    <button disabled={this.state.hasPayed} onClick={this.handleClickSplit}>Split Check</button>
                </div>

            )
        }
    }

    render() {
        return (
            <section>
                <div  className="pay-container">
                    <h1>Payment</h1>
                    {this.paymentStatusHandler()}
                </div>
                {this.cardModal()}
                <Modal show={this.state.splitCheck}>
                    <input title="split bill number" type='number' step="1" min="1" className="payment-input" value={this.state.splitNum} onChange={this.handleChangeSplit}/>
                    <button onClick={() => {this.cardPaymentHandler()}} disabled={this.state.splitNum < 1}>Continue</button>
                </Modal>
            </section>
        )
    }
}