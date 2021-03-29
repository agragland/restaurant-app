import React, { Component } from 'react'
import api from '../api'

class MenuInsert extends Component {
    constructor(props) {
        super(props);

        let item = {
            name: '',
            category: '',
            ingredients: '',
            price: '',
            img: '',
            isAvailable: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.item.name = name
    }

    handleChangeInputCategory = async event => {
        const category = event.target.value
        this.setState({category})
    }

    handleChangeInputIngredients = async event => {
        const ingredients = event.target.value
        this.setState({ingredients})
    }

    handleChangeInputPrice = async event => {
        const price = event.target.value
        this.setState({price})
    }

    handleChangeInputImage = async event => {
        const img = event.target.value
        this.setState({img})
    }

    handleChangeInputAvail = async event => {
        const isAvailable = event.target.value
        this.setState({isAvailable})
    }

    handleInsertItem = async () => {
        const{ name, category, ingredients, price, img, isAvailable } = this.state
        const arrIngredients = ingredients.split('/')
        const payload = { name, category, ingredients: arrIngredients, price, img, isAvailable }


        await api.insertItem(payload).then(res => {
            window.alert(`Item inserted successfully`)
            this.setState({
                name: [],
                category: '',
                ingredients: '',
                price: '',
                img: '',
                isAvailable: '',
            })
        })
    }

    render() {
        return (
            <>
                <form>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChangeInputName} />
                    </label>
                    <label>
                        Category:
                        <input type="text" value={this.state.value} onChange={this.handleChangeInputCategory} />
                    </label>
                    <label>
                        Ingredients:
                        <input type="text" value={this.state.value} onChange={this.handleChangeInputIngredients} />
                    </label>
                    <label>
                        Price:
                        <input type="text" value={this.state.value} onChange={this.handleChangeInputPrice} />
                    </label>
                    <label>
                        Image:
                        <input type="text" value={this.state.value} onChange={this.handleChangeInputImage} />
                    </label>
                    <label>
                        Available?:
                        <input type="text" value={this.state.value} onChange={this.handleChangeInputAvail} />
                    </label>
                    <input type="button" value="Submit" onClick={this.handleInsertItem} />
                </form>
            </>

        )
    }



}

export default MenuInsert