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
            order_id: '',
            order: {},
            paymentReady: false,
            cardModal: false,
            modal_2: 0,
            freeDessert: 0,
            customTip: 0,
            customItem: false,
            splitNum: 1,
            splitCheck: false,
            splitTotal: 0
        }
    }

    componentDidMount = async () => {
        await apis.getOrder(payload.order_id).then(order =>{
            if(order.data.data.status === 'Delivered')
            {
                this.setState({
                    order: order.data.data,
                    paymentReady: true,
                    modal_2: 0
                })
            }
        }).catch(err => {
            this.setState({
                paymentReady: false,
                modal_2: 0
            })
        })

        this.handleGetItems()
        console.log(this.state)
    }

    handleGetItems = async () => {
        await api.getAllItems().then(items => {
            menu_items = items.data.data
        })

        console.log(menu_items)
    }

    handleUpdateOrder = async (payload) => {
        await api.updateOrder(payload._id, payload)
    }

    orderFreeDessert = async (item, comments) => {
        //set up order payload and submit
        const final_payload = { order_items: [item], comments, commped: [true], subtotal: 0, total: 0, status:'Created', table:getTableNum() }
        await apis.createOrder(final_payload).then(res => {
            window.alert(`Order created successfully`)
            preparePayment(res.data.id)
        })
    }

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
                    <input type = "text" onChange={handleCommentField}/>
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

    continueSplit = () => {
        if(this.state.splitNum === 1) {
            this.tipModalHandler(3)
        }
        else {
            this.setState(prevState => ({
                splitNum: prevState.splitNum-1,
                splitTotal: prevState.splitTotal-prevState.order.tip
            }))
            this.tipModalHandler(1)
        }
    }

    cardModal = () =>
    {
        if (this.state.modal_2 === 0) {
            return (
                <Modal show={this.state.cardModal}>
                    <p>Please insert Card</p>
                    <button onClick={() => {
                        this.tipModalHandler(1)
                    }}>Insert Card
                    </button>
                </Modal>
            )
        } else if (this.state.modal_2 === 1) {
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
                    <input type='number' className="payment-input" value={this.state.customTip} onChange={this.handleCustomTipValue}/>
                    <button onClick={() => {
                        this.tipHandler(this.state.customTip / 100)
                    }}>Submit Custom Tip
                    </button>
                </Modal>
            )
        } if (this.state.modal_2 === 2) {
            return (
                <Modal show={this.state.cardModal}>
                    <h1>You Paid ${this.state.splitTotal.toFixed(2)}</h1>
                    <button onClick={this.continueSplit}>Continue</button>
                </Modal>
            )
        } else if (this.state.modal_2 === 3) {
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
    freeDessertHandler = () => {
        let temp = this.state.order
        temp.status = "paid"
        this.handleUpdateOrder(temp)

        if(this.state.freeDessert === 0)
        {
            return(
                <button onClick={this.dessertRandomizer}>Click for a chance to win!</button>
            )
        }
        else if(this.state.freeDessert === 1)
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
        else if(this.state.freeDessert === 2)
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

    dessertRandomizer = () => {
        if(Math.random() <= 0.33)
        {
            this.setState({freeDessert: 1})
        }
        else
        {
           this.setState({freeDessert: 2})
        }
    }

    /*
    *********
    TIP HANDLING
    *********
    */
    tipHandler = async (tipPerc) => {
        let temp = this.state.order
        temp.tip = this.state.splitTotal * tipPerc
        temp.total += temp.tip
        this.setState(prevState => ({order: temp, splitTotal: prevState.splitTotal+temp.tip}))
        this.tipModalHandler(2)

        console.log(this.state)
    }

    tipModalHandler = (state) => {
        this.setState({modal_2: state})
    }

    handleCustomTipValue = (e) => {
        this.setState({
            customTip: e.target.value
        })
    }

    handleChangeSplit = (e) => {
        this.setState({
            splitNum: Math.ceil(e.target.value)
        })
    }

    handleClickSplit = () => {
        this.setState(prevState => ({splitCheck: !prevState.splitCheck}))
    }

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
            let new_table = table.data.data
            new_table.payCash = true
            this.handleUpdateTable(new_table)
        })
    }

    paymentStatusHandler = () => {
        if(!this.state.paymentReady)
        {
            return (
                <>
                <p className="big-text">No order placed</p>
                <p className="big-text">Go place an order!</p>
                </>
            )
        }
        else
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
                    <button onClick={this.cardPaymentHandler}>Pay with Card</button>
                    <button onClick={this.handleClickCash}>Pay with Cash</button>
                    <button onClick={this.handleClickSplit}>Split Check</button>
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
                    <input type='number' step="1" min="1" className="payment-input" value={this.state.splitNum} onChange={this.handleChangeSplit}/>
                    <button onClick={() => {this.cardPaymentHandler()}} disabled={this.state.splitNum < 1}>Continue</button>
                </Modal>
            </section>
        )
    }
}