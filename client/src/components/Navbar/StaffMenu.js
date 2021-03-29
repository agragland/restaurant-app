import React, {useState, useEffect} from 'react';
import "./staffMenu.css"
import api from "../../api";

let menu_items = []

const Item = ({name, price,}) => (
    <div>
        <div>
            <p>{name}</p>
            <p>{price}</p>
        </div>
    </div>
)


//makes modal
function Modal({show, children}) {
    if (!show)
        return null;

    return (
        <div className="modal-background">
            <section className="modal-main-staff">
                {children}
            </section>
        </div>
    );
}

//makes dropdown menu
function DropMenu({show, children}) {
    if(!show)
        return null;

    return(
        <div className="drop-menu">
            {children}
        </div>
    );
}

export default function StaffMenu() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleGetItems()
    }, []);


    const handleGetItems = async () => {
        await api.getAllItems().then(items => {
            menu_items = items.data.data
        })

        console.log(menu_items)
    }

    const handleModalClick =  () => {
        setShowModal((prev) => !prev);

    }

    //various dropdown menus based on menu categories

    //Entrees
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

    return (
        <div>
            <button onClick={handleModalClick} className="menu-button">Menu</button>
            <Modal show={showModal}>
                <button onClick={handleModalClick}>X</button>
                <p>
                    <button onClick={handleAppetizersClick}>Appetizers</button>
                    <DropMenu show={showAppetizers}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'appetizers')
                                {
                                    return(<Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleEntreesClick}>Entrees</button>
                    <DropMenu show={showEntrees}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'entrees')
                                {
                                    return(<Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleSidesClick}>Sides</button>
                    <DropMenu show={showSides}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'sides')
                                {
                                    return(<Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleKidsClick}>Kids Meals</button>
                    <DropMenu show={showKids}>
                        {
                            menu_items.map((item, index) => {
                                if(item.category === 'kids')
                                {
                                    return(<Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                    />)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleDessertsClick}>Desserts</button>
                    <DropMenu show={showDesserts}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleDrinksClick}>Drinks</button>
                    <DropMenu show={showDrinks}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
            </Modal>
        </div>
    );
}