import React, {useEffect, useState} from "react";
import api from "../../../../api";
import {handleAddToOrder} from "./OrderView"
import './MenuView.css'

let menu_items = [];


const Item = ({item}) => (
    <div className={"item-display"}>
        <div>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <ul>
                {item.ingredients.map((ingredient, index) =>
                    <li key={index}>{ingredient}</li>
                ) }
            </ul>
            <button onClick={() => handleAddToOrder(item)}>Add to Order</button>
        </div>
    </div>
)


function DropMenu({show, children}) {
    if(!show)
        return null;

    return(
        <div className={"grid-display"}>
            {children}
        </div>
    );
}

export default function MenuView(){

    useEffect(() => {
        handleGetItems()
    }, []);


    const handleGetItems = async () => {
        await api.getAllItems().then(items => {
            menu_items = items.data.data
        })

        console.log(menu_items)
    }

    const [showEntrees, setShowEntrees] = useState(false);
    const handleEntreesClick = () => {
        setShowEntrees((prev) => !prev);
    }

    //Appetizers
    const [showAppetizers, setShowAppetizers] = useState(false);
    const handleAppetizersClick = () => {
        setShowAppetizers((prev) => !prev);
    }

    //Sides
    const [showSides, setShowSides] = useState(false);
    const handleSidesClick = () => {
        setShowSides((prev) => !prev);
    }

    //Kids
    const [showKids, setShowKids] = useState(false);
    const handleKidsClick = () => {
        setShowKids((prev) => !prev);
    }

    //Desserts
    const [showDesserts, setShowDesserts] = useState(false);
    const handleDessertsClick = () => {
        setShowDesserts((prev) => !prev);
    }

    //Drinks
    const [showDrinks, setShowDrinks] = useState(false);
    const handleDrinksClick = () => {
        setShowDrinks((prev) => !prev);
    }

    return(

        <div className={"full-menu-box"}>
            <div className={"menu-box"}>
                <h1>Menu</h1>
                    <button onClick={handleAppetizersClick}>Appetizers</button>
                    <DropMenu show={showAppetizers}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'appetizers')
                                {
                                    return(<Item
                                        key={index}
                                        item={item}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                    <button onClick={handleEntreesClick}>Entrees</button>
                    <DropMenu show={showEntrees}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'entrees')
                                {
                                    return(<Item
                                        key={index}
                                        item={item}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                    <button onClick={handleSidesClick}>Sides</button>
                    <DropMenu show={showSides}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'sides')
                                {
                                    return(<Item
                                        key={index}
                                        item={item}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                    <button onClick={handleKidsClick}>Kids Meals</button>
                    <DropMenu show={showKids}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'kids')
                                {
                                    return(<Item
                                        key={index}
                                        item={item}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                    <button onClick={handleDessertsClick}>Desserts</button>
                    <DropMenu show={showDesserts}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'desserts')
                                {
                                    return(<Item
                                        key={index}
                                        item={item}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                    <button onClick={handleDrinksClick}>Drinks</button>
                    <DropMenu show={showDrinks}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'drinks')
                                {
                                    return(<Item
                                        key={index}
                                        item={item}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
            </div>
        </div>
    );
}