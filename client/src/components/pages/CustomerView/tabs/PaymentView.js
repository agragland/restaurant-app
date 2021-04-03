import React from "react"
import apis from "../../../../api"
import Modal from "../../../Modal"

let payload = {
    order_id: '',
    paymentReady: false,
}

export const preparePayment = (id) => {
    payload.order_id = id
    payload.paymentReady = true
}

const PaymentItem = ({item}) => {
    return (
        <div>
            <p>{item.name} {item.price}</p>
        </div>
    )
}

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

        console.log(this.state)
    }

    cardModal = () =>
    {
        if(this.state.modal_2 === 0)
        {
            return(
                <Modal show={this.state.cardModal}>
                    <button onClick={this.cardPaymentHandler}>X</button>
                    <p>Please insert Card</p>
                    <button onClick={() => {this.tipModalHandler(1)}}>Insert Card</button>
                </Modal>
            )
        }
        else if(this.state.modal_2 === 1)
        {
            return(
                <Modal show={this.state.cardModal}>
                    <button onClick={this.cardPaymentHandler}>X</button>
                    <h1>Select your tip</h1>
                    <button onClick={() => {this.tipHandler(0.1)}}>10% tip</button>
                    <button onClick={() => {this.tipHandler(0.15)}}>15% tip</button>
                    <button onClick={() => {this.tipHandler(0.2)}}>20% tip</button>
                    <input type='number' onChange={this.handleCustomTipValue}/>
                    <button>Submit Custom Tip</button>
                </Modal>
            )
        }
        else if(this.state.modal_2 === 2)
        {
            return(
                <Modal show={this.state.cardModal}>
                    <h1>You Paid ${this.state.order.total.toFixed(2)}</h1>
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
                </>
            )
        }
        else if(this.state.freeDessert === 2)
        {
            return(
                <>
                    <h1>Sorry! You Did Not Win!</h1>
                    <h1>Thanks for Visiting Taco Palace</h1>
                    <button>Complete Order</button>
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
        temp.tip = temp.total * tipPerc
        temp.total = temp.total + temp.tip
        temp.status = 'Paid'
        this.setState({order: temp})

        await apis.updateOrder(temp._id,temp).then(res =>
            this.tipModalHandler(2)
        )
        console.log(this.state)
    }

    tipModalHandler = (state) => {
        this.setState({modal_2: state})
    }

    handleCustomTipValue = async event => {

    }



    cardPaymentHandler = () =>
    {
        this.setState(prevState => ({cardModal: !prevState.cardModal}))
    }

    paymentStatusHandler = () => {
        if(!this.state.paymentReady)
        {
            return (
                <>
                <h1>No order placed</h1>
                <h1>Go place an order!</h1>
                </>
            )
        }
        else
        {
            return (
                <div>
                    {this.state.order.order_items.map((item_test,index) => (
                        <div>
                            <PaymentItem key={index} item={item_test} />
                        </div>
                    ))
                    }
                    <h1>Subtotal: {this.state.order.subtotal.toFixed(2)}</h1>
                    <h1>Tax: {(this.state.order.subtotal * 0.0825).toFixed(2)}</h1>
                    <h1>Total: {this.state.order.total.toFixed(2)}</h1>
                    <button onClick={this.cardPaymentHandler}>Pay with Card</button>
                    <button>Pay with Cash</button>
                    <button>Split Check</button>
                </div>

            )
        }
    }

    render() {
        return (
            <>
            <h1>Payment</h1>
            {this.paymentStatusHandler()}
            {this.cardModal()}
            </>
        )
    }


}