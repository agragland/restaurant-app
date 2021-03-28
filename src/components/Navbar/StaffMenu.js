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

//makes add menu modal
function AddModal({show, children}) {
    if(!show)
        return null;

    return (
        <div className="modal-background">
            <section className="modal-add-item">
                {children}
            </section>
        </div>
    ); 
}

const item = { name: '', category: '', ingredients: '', price: '', avalibility: true, image: '' }

//accessing the menu is something everyone can do
export default function AccessMenu({level}) {
    //for the levels: 
        // 0 : customer - will get access to view only
        // 1 : Lobby - will get access to view and remove
        // 2 : Manager - will get acces to view, remove, replace, delete, and add

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

    //Menu options
    const [menuItem, setMenuItem] = useState(item);
    let avalibleMenu = [] 
    let unavalibleMenu = []

    //populate the menu from database - VERY FIRST THING TO HAPPEN
    const popMenu = () => {

    }

    //add menu item
    const [showAdd, setShowAdd] = useState(false);
    const handleAddClick = () => {
        setShowAdd((prev) => !prev);
    }     
    var canAdd; //button to access AddMenu - Manager ONLY
    if (level > 1){
        canAdd = <button onClick={handleAddClick}>Add Menu Item</button>;
    }
    //add item to database and menu
    const AddMenu = () => {
        //add to database

        //if avalible is true -> add to avalible menu

        //else (avalible is false) -> add to unavalible menu
    }

    //remove an item from avalible menu - NOTE: this removes an item from avalible array
    //and places it into the unavalible array
    const RemoveMenu = () => {

    }
    var canRemove; //button to access RemoveMenu
    if (level > 0){
        canRemove = <button onClick={RemoveMenu}>Remove Item</button> 
    }

    //replace an item to avalible menu - NOTE: this removes an item form unavalible
    //array and places it into the avalible array
    const ReplaceMenu = () => {

    }
    var canReplace; //button to access Replace - Manager ONLY
    if (level > 1){
        canReplace = <button onClick={ReplaceMenu}>Replace Item</button> 
    }


    //deletes an item from the unavalible array - Manager ONLY
    const DeleteMenu = () => {

    }
    var canDelete; //button to access Delete - Manager ONLY
    if (level > 1){
        canDelete = <button onClick={DeleteMenu}>Delete Item</button> 
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
            <AddModal show={showAdd}>
                <button onClick={handleAddClick}>X</button> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <form>
                    {/*enter name*/}

                    {/*select category*/}

                    {/*enter ingredients*/}

                    {/*enter price*/}

                    {/*select if avaliable*/}

                    {/*collect image*/}

                </form>
            </AddModal>

        </div>
    );
}