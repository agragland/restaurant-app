import React, {useEffect, useState} from "react";
import api from "../../../../api";
import {handleAddToOrder} from "./OrderView"
import './MenuView.css'
import Modal from "../../../Modal";

let menu_items = [];

export const Item = ({item}) => {
    const [customItem, showCustomItem] = useState(false);
    let comment = ""

    const handleCommentField = (e) => { //set comments
        comment = e.target.value
    }

    if(item.isAvailable === false)
        return <></>

    //returns information for an item, or a modal with the information if the customer adds comments
    return(
    <>
        <Modal show={customItem}>
            <button onClick={() => showCustomItem(!customItem)} className="x-button">X</button>
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
                    <input type = "text" title="comments" className="comment-input" onChange={handleCommentField}/>
                </form>
                <button onClick={() => {
                    handleAddToOrder(item, comment);
                    showCustomItem(!customItem);
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
                <button onClick={() => handleAddToOrder(item, "")}>Add to Order</button>
                &nbsp;
                <button onClick={() => showCustomItem(!customItem)}>Customize</button>
            </div>
        </div>
    </>
    )
}

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


    //gets all items from the database
    const handleGetItems = async () => {
        await api.getAllItems().then(items => {
            menu_items = items.data.data
        })

        console.log(menu_items)
    }

    //turns off all drop menus
    const resetShow = () => {
        setShowEntrees(false)
        setShowAppetizers(false)
        setShowSides(false)
        setShowKids(false)
        setShowDesserts(false)
        setShowDrinks(false)
    }

    //Entrees
    const [showEntrees, setShowEntrees] = useState(false);
    const handleEntreesClick = () => {
        resetShow()
        setShowEntrees(true);
    }

    //Appetizers
    const [showAppetizers, setShowAppetizers] = useState(false);
    const handleAppetizersClick = () => {
        resetShow()
        setShowAppetizers(true);
    }

    //Sides
    const [showSides, setShowSides] = useState(false);
    const handleSidesClick = () => {
        resetShow()
        setShowSides(true);
    }

    //Kids
    const [showKids, setShowKids] = useState(false);
    const handleKidsClick = () => {
        resetShow()
        setShowKids(true);
    }

    //Desserts
    const [showDesserts, setShowDesserts] = useState(false);
    const handleDessertsClick = () => {
        resetShow()
        setShowDesserts(true);
    }

    //Drinks
    const [showDrinks, setShowDrinks] = useState(false);
    const handleDrinksClick = () => {
        resetShow()
        setShowDrinks(true);
    }

    return(
        <div className={"menu-box"}>
            <h1>Menu</h1>
            <div className="button-container">
                <button className="category-button" onClick={handleAppetizersClick} disabled={showAppetizers}>Appetizers</button>
                <button className="category-button" onClick={handleEntreesClick} disabled={showEntrees}>Entrees</button>
                <button className="category-button" onClick={handleSidesClick} disabled={showSides}>Sides</button>
                <button className="category-button" onClick={handleKidsClick} disabled={showKids}>Kids Meals</button>
                <button className="category-button" onClick={handleDessertsClick} disabled={showDesserts}>Desserts</button>
                <button className="category-button" onClick={handleDrinksClick} disabled={showDrinks}>Drinks</button>
            </div>
            <div className="menu-container">
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
                <DropMenu show={showEntrees}>
                    {
                        menu_items.map((item, index) => {
                            if(item.category === 'entrees')
                            {
                                return(
                                    <Item key={index} item={item}/>
                                )
                            }
                            else
                                return null;
                        })
                    }
                </DropMenu>
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