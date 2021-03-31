import React, {useState, useEffect} from 'react';
import "./staffMenu.css"
import api from "../../api";

let avail_menu_items = []
let unavail_menu_items = []

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

export default function StaffMenu({level}) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleGetItems()
    }, []);


    const handleGetItems = async () => {
        await api.getAllItems().then(items => {
            avail_menu_items = items.data.data
        })

        console.log(avail_menu_items)
    }

    const handleModalClick =  () => {
        setShowModal((prev) => !prev);

    }

        //MODALS ^^
    //--------------------------------------------------------------------------------------------------------------------------
        //various dropdown menus based on menu categories vv
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
    const [menuItem, setMenuItem] = useState('');
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
    const setValue = () => {

    }

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
                <button onClick={handleModalClick}>X</button>
                <p>
                    <button onClick={handleAppetizersClick}>Appetizers</button>
                    <DropMenu show={showAppetizers}>
                        {
                            avail_menu_items.map((item, index) => {
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
                            avail_menu_items.map((item, index) => {
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
                            avail_menu_items.map((item, index) => {
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
                            avail_menu_items.map((item, index) => {
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
                    {/*select category*/}
                    <label>
                        Category:
                    </label>
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
                    </label>
                    {/*collect image*/}
                    <br/>
                    <input type="submit" value="Create Menu Item" />
                </form>
            </AddModal>
        </div>
    );
}