import React, {useState} from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import makeAnimated from 'react-select/animated'
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

//all possible categories
const Categories = [
    { label: 'Entrees', value: 'entree' },
    { label: 'Appetizers', value: 'appetizer' },
    { label: 'Sides', value: 'side' },
    { label: 'Kids', value: 'kids' },
    { label: 'Desserts', value: 'dessert' },
    { label: 'Drinks', value: 'drinks' },
];
//boolean to assist in labeling the avalibility
const AvalBool = [
    {label: 'Yes', value: true}, 
    {label: 'No', value: false},
];
//all possible data fields needed 
const item = { name: '', category: '', ingredients: '', price: '', avalibility: false, image: '' }

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

        //ACCESSIBLE MENU ^^
    //--------------------------------------------------------------------------------------------------------------------------
        //ADD ITEM TO MENU vv

    //Menu options that are avalible to passed in level
    const [menuItem, setMenuItem] = useState(item);
    let avalibleMenu = [] 
    let unavalibleMenu = []

    //populate the menu from database - VERY FIRST THING TO HAPPEN  -- should it be useEffect??
    const popMenu = () => {
        //populate all data from database for menu
        //place database data into appropriate menu array
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
    //set the value of an input


    //add item to database and menu
    const AddMenu = ({newItem}) => {
        //add to database

        //if avalible is true -> add to avalible menu

        //else (avalible is false) -> add to unavalible menu
    }

        //ADD ITEM TO MENU ^^
    //--------------------------------------------------------------------------------------------------------------------------
        //OTHER MENU OPTIONS vv

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

    //  OTHER MENU OPTIONS ^^
//--------------------------------------------------------------------------------------------------
    // ACCESSIBLE MENU vv
    return (
        <div>
            <button onClick={handleModalClick} className="menu-button">Menu</button>
            <Modal show={showModal}>
                <button onClick={handleModalClick}>X</button> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
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

        {/* ACCESSIBLE MENU ^^
        --------------------------------------------------------------------------------------------------
            ADD ITEM TO MENU vv */}    

            <AddModal show={showAdd}>
                <button onClick={handleAddClick}>X</button> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <form onSubmit={AddMenu({menuItem})}>
                    {/*enter name*/}
                    <label>
                    Name: &emsp;
                    <input type="text" placeholder="Enter name of item here" value={menuItem.name} onChange={setValue('name')} />
                    </label>
                    {/*select category
                    <label>
                        <AsyncCreatableSelect placeholder="Select Item Category" 
                                         cacheOptions
                                         defaultOptions
                                         loadOptions={promiseOptions} 
                                         />
                    </label> */}
                    {/*enter ingredients*/}
                    <br/> 
                    <label>
                    Ingredients: &emsp;
                    <textarea placeholder="List all cooking ingredients here" value={menuItem.ingredients} onChange={setValue('ingredients')} />
                    </label>
                    {/*enter price*/}
                    <br/>
                    <label>
                    Price: &emsp;
                    <input type="text" placeholder="Enter price of item here" value={menuItem.price} onChange={setValue('name')} />
                    </label>
                    {/*select if avaliable*/}
                    <label>
                        Avaliblility:
                        {/*<AsyncCreatableSelect placeholder="Is this Item Avalible?" options={AvalBool} onChange={setValue('avalibility')} />
                    */}</label>
                    {/*collect image*/}
                    <br/>
                    <input type="submit" value="Create Menu Item" />
                </form>
            </AddModal>

        </div>
    );
}