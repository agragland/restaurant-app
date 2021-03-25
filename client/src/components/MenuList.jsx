import React, { Component } from 'react'
import api from '../api'

const Item = ({name, category, price,}) => (
    <div>
        <div>
            <p>{name}</p>
            <p>{category}</p>
            <p>{price}</p>
        </div>
    </div>
)


class MenuList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }

    handleGetItems = async () => {
        await api.getAllItems().then(items => {
            this.setState({
                items: items.data.data
            })
        })
    }

    render()  {
        return(
            <>
                <button onClick={this.handleGetItems}>Click to get Items</button>
                {
                    this.state.items.map((item, index) => (
                        <Item
                            key={index}
                            name={item.name}
                            category={item.category}
                            price={item.price}
                        />
                    ))
                }
            </>
        )
    }

}

export default MenuList