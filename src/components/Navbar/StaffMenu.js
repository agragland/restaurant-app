import React, {useState} from 'react';
import "./staffMenu.css"

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

//populate the menu from database
function popMenu(){

}

//remove an item from avalible menu - NOTE: this removes an item from avalible array
//and places it into the unavalible array
function removeMenu(){

}

//replace an item to avalible menu - NOTE: this removes an item form unavalible
//array and places it into the avalible array
function replaceMenu(){

}

//deletes an item from the unavalible array
function deleteMenu(){

}

const item = {category: '', name: '', price: '', ingredients: '', }

//accessing the menu is something everyone can do
export default function AccessMenu({level}) {
    //for the levels: 
        // 0 : customer - will get access to view only
        // 1 : Lobby - will get access to view and remove
        // 2 : Manager - will get acces to view, remove, replace, delete, and add

    let avalibleMenu = [] 
    let unavalibleMenu = []

    const [showModal, setShowModal] = useState(false);
    const handleModalClick = () => {
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


    //add menu item
    
    const AddMenu = () => {
    } 
    
    var canAdd; //will be set to button to access AddMenu
    if (level > 1){
        canAdd = <button onClick={AddMenu}>Add Menu Item</button>;
    }


    return (
        <div>
            <button onClick={handleModalClick} className="menu-button">Menu</button>
            <Modal show={showModal}>
                <button onClick={handleModalClick}>X</button> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                {canAdd}
                <p>
                    <button onClick={handleAppetizersClick}>Appetizers</button>
                    <DropMenu show={showAppetizers}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleEntreesClick}>Entrees</button>
                    <DropMenu show={showEntrees}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleSidesClick}>Sides</button>
                    <DropMenu show={showSides}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleKidsClick}>Kids Meals</button>
                    <DropMenu show={showKids}>
                        I'm a drop menu :)
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