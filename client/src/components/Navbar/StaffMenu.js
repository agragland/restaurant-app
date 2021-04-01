import React, {useState, useEffect} from 'react';
import "./staffMenu.css"
import api from "../../api";

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

//make modal for unavailable menu
function UnavailableModal({show, children}) {
    if (!show)
        return null;

    return (
        <div className="modal-background">
            <section className="modal-unavailible-menu">
                {children}
            </section>
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
  //MODALS ^^
//--------------------------------------------------------------------------------------------------------------------------
    //export funciton begin vv

export default function StaffMenu({level}) {
    const [showModal, setShowModal] = useState(false);
    const [showUnavailableModal, setShowUnavailableModal] = useState(false);
    const [availMenuItems, setAvailItems] = useState([]);
    const [unavailMenuItems, setUnavailItems] = useState([]);

    useEffect(() => {
        handleGetItems()
    }, []);


    const handleGetItems = async () => {
        await api.getAllItems().then(items => {
            const curr_items = items.data.data
            console.log(curr_items)
            let temp_available = []
            let temp_unavailable = []

            curr_items.map((item) => {
                if(item.isAvailable === true){
                    temp_available = [...temp_available, item]
                }
                else{
                    temp_unavailable = [...temp_unavailable, item]
                }
            })

            //set states to temp
            setAvailItems(temp_available)
            setUnavailItems(temp_unavailable)
        })
        
    }

    const handleModalClick =  () => {
        setShowModal((prev) => !prev);
    }

    const handleUnavailableClick = () => {
        setShowUnavailableModal((prev) => !prev);
    }

    //various dropdown menus based on menu categories vv   
    //Entrees
    const [showEntrees, setShowEntrees] = useState(false);
    const handleEntreesClick = () => {
        setShowEntrees((prev) => !prev);
    }
    //UnavailableEntrees
    const [showUnavailableEntrees, setShowUnavailableEntrees] = useState(false);
    const handleUnavailableEntreesClick = () => {
        setShowUnavailableEntrees((prev) => !prev);
    }

    //Appetizers
    const [showAppetizers, setShowAppetizers] = useState(false);
    const handleAppetizersClick = () => {
        setShowAppetizers((prev) => !prev);
    }
    //UnavailableAppetizers
    const [showUnavailableAppetizers, setShowUnavailableAppetizers] = useState(false);
    const handleUnavailableAppetizersClick = () => {
        setShowUnavailableAppetizers((prev) => !prev);
    }

    //Sides
    const [showSides, setShowSides] = useState(false);
    const handleSidesClick = () => {
        setShowSides((prev) => !prev);
    }
    //UnavailableSides
    const [showUnavailableSides, setShowUnavailableSides] = useState(false);
    const handleUnavailableSidesClick = () => {
        setShowUnavailableSides((prev) => !prev);
    }

    //Kids
    const [showKids, setShowKids] = useState(false);
    const handleKidsClick = () => {
        setShowKids((prev) => !prev);
    }
    //UnavailableKids
    const [showUnavailableKids, setShowUnavailableKids] = useState(false);
    const handleUnavailableKidsClick = () => {
        setShowUnavailableKids((prev) => !prev);
    }

    //Desserts
    const [showDesserts, setShowDesserts] = useState(false);
    const handleDessertsClick = () => {
        setShowDesserts((prev) => !prev);
    }
    //UnavailableDesserts
    const [showUnavailableDesserts, setShowUnavailableDesserts] = useState(false);
    const handleUnavailableDessertsClick = () => {
        setShowUnavailableDesserts((prev) => !prev);
    }

    //Drinks
    const [showDrinks, setShowDrinks] = useState(false);
    const handleDrinksClick = () => {
        setShowDrinks((prev) => !prev);
    }
    //Unavailable Drinks
    const [showUnavailableDrinks, setShowUnavailableDrinks] = useState(false);
    const handleUnavailableDrinksClick = () => {
        setShowUnavailableDrinks((prev) => !prev);
    }
    //various dropdown menus based on menu categories ^^
//--------------------------------------------------------------------------------------------------------------------------
    //ADD ITEM TO MENU vv
    const [menuItem, setMenuItem] = useState({name: '', category: '', ingredients: '', price: '', img: '', isAvailable: true})
    
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
    const setValue = (variable) => {
        return({target: {value}}) => {
            setMenuItem(menuItem => ({...menuItem, [variable]: value}));
        }
    };

    //add item to database and menu
    const AddMenu = async () => {
        const {name, category, ingredients, price, img, isAvailable} = menuItem
        const payload = {name, category, ingredients, price, img, isAvailable}

        console.log(payload)
        //add to database
        await api.insertItem(payload).then(res => {
            window.alert(`Item inseted seccessfully`)
            menuItem = {
                name: '',
                category: '',
                ingredients: '',
                price: 0.00,
                img: '',
                isAvailable: 1
            }
        }) 

        console.log(availMenuItems)
        console.log(unavailMenuItems)
        setShowModal((prev) => !prev);
    }

    //ADD ITEM TO MENU ^^
//--------------------------------------------------------------------------------------------------------------------------
    //OTHER MENU OPTIONS vv

    //remove an item from avalible menu - NOTE: this removes an item from avalible array
    //and places it into the unavalible array
    const clickToRemove = ({target}) => {
        //add item to unavailable menu
        const index = target.value
        availMenuItems[index].isAvailable = false;
        setUnavailItems((prev) => prev.concat(availMenuItems[index]))

        //update the database
        handleRemove(availMenuItems[index])

        //remove from availible menu
        let temp = [...availMenuItems]
        temp.splice(index, 1)
        setAvailItems(() => temp)
    }
    const handleRemove = async (payload) => {
        await api.updateItem(payload._id, payload).then(res => {
            window.alert('Item No Longer Available')
        })

        //log change to change log

    }
    var canRemove = false; //button to access clickToRemove
    if (level > 0){
        canRemove = true;
    }


    //replace an item to avalible menu - NOTE: this removes an item form unavalible
    //array and places it into the avalible array
    const clickToReplace = ({target}) => {
        //add item to available menu
        const index = target.value
        unavailMenuItems[index].isAvailable = true;
        setAvailItems((prev) => prev.concat(unavailMenuItems[index]))

        //update the database
        handleReplace(unavailMenuItems[index])

        //remove from unavailible menu
        let temp = [...unavailMenuItems]
        temp.splice(index, 1)
        setUnavailItems(() => temp)
    }
    const handleReplace = async (payload) => {
        await api.updateItem(payload._id, payload).then(res => {
            window.alert('Item Now Available')
        })

        //log change to change log

    }
    var canReplace = false; //button to access Replace - Manager ONLY
    if (level > 1){
        canReplace = true;
    }


    //deletes an item from the unavalible array - Manager ONLY
    const handleMenuItem = ({itemName}) => {
        setMenuItem({itemName})
    }
    const DeleteMenu = async({item}) => {
        const payload = item

        await api.deleteItem.then(res =>{
            
        })
    }
    var canDelete = false; //button to access Delete - Manager ONLY
    if (level > 1){
        canDelete = true//<button onClick={DeleteMenu}>Delete Item</button> 
    }   
    
    
    var unavailableMenu;//show unavailable menu option
    if(level>0){
        unavailableMenu = <button onClick={handleUnavailableClick} className="menu-button">Unavailable Menu</button>
    }

    //  OTHER MENU OPTIONS ^^
//--------------------------------------------------------------------------------------------------
    // ACCESSIBLE MENU vv

    return (
        <div>
            <button onClick={handleModalClick} className="menu-button">Menu</button>
            <Modal show={showModal}>
                <button onClick={handleModalClick}>X</button>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                {canAdd}
                <h3 style={{textAlign: 'center', fontSize: '20px'}}>Menu</h3>
                <p>
                    <button onClick={handleAppetizersClick}>Appetizers</button>
                    <DropMenu show={showAppetizers}>
                        {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'appetizers' && canRemove)
                                {
                                    return(
                                    <>
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToRemove}>Remove Item</button> 
                                    </>)
                                    
                                }
                                else if(item.category === 'appetizers')
                                {
                                    return(
                                        <Item
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
                            availMenuItems.map((item, index) => {
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
                            availMenuItems.map((item, index) => {
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
                            availMenuItems.map((item, index) => {
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
                        {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'dessert')
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
                    <button onClick={handleDrinksClick}>Drinks</button>
                    <DropMenu show={showDrinks}>
                    {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'drink')
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
                {unavailableMenu}
            </Modal>    
            
    
    {/* ACCESSIBLE MENU ^^ 
    --------------------------------------------------------------------------------------------------
        UNACCESSIBLE MENU vv */}
        <UnavailableModal show={showUnavailableModal}>
            <button onClick={handleUnavailableClick}>Back To Menu</button>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <h3 style={{textAlign: 'center', fontSize: '20px'}}>Unavailable Menu</h3>
                <p>
                    <button onClick={handleUnavailableAppetizersClick}>Appetizers</button>
                    <DropMenu show={showUnavailableAppetizers}>
                        {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'appetizers' && canReplace)
                                {
                                    return(
                                    <>
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToReplace}>Replace Item</button>  
                                    </>)
                                    
                                }
                                else if(item.category === 'appetizers')
                                {
                                    return(
                                        <Item
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
                    <button onClick={handleUnavailableEntreesClick}>Entrees</button>
                    <DropMenu show={showUnavailableEntrees}>
                        {
                            unavailMenuItems.map((item, index) => {
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
                    <button onClick={handleUnavailableSidesClick}>Sides</button>
                    <DropMenu show={showUnavailableSides}>
                        {
                            unavailMenuItems.map((item, index) => {
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
                    <button onClick={handleUnavailableKidsClick}>Kids Meals</button>
                    <DropMenu show={showUnavailableKids}>
                        {
                            unavailMenuItems.map((item, index) => {
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
                    <button onClick={handleUnavailableDessertsClick}>Desserts</button>
                    <DropMenu show={showUnavailableDesserts}>
                        {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'dessert')
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
                    <button onClick={handleUnavailableDrinksClick}>Drinks</button>
                    <DropMenu show={showUnavailableDrinks}>
                    {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'drink')
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
            </UnavailableModal>  
               

    
    {/* UNACCESSIBLE MENU ^^
    --------------------------------------------------------------------------------------------------
        ADD ITEM TO MENU vv */}    

            <AddModal show={showAdd}>
                <button onClick={handleAddClick}>X</button> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <form onSubmit={AddMenu}>
                    {/*enter name*/}
                    <label>
                    Name: &emsp;
                    <input type="text" placeholder="Enter name of item here" value={menuItem.name} onChange={setValue('name')} />
                    </label>
                    <br/>
                    {/*select category*/}
                    <label>
                        Category:
                        <input type="text" placeholder="Enter category of food item here" value={menuItem.category} onChange={setValue('category')} />
                    </label>
                    <p>Enter one of the following Categories: entrees, appetizers, sides, kids, dessert, drink</p>
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
                        <input type="text" placeholder="Enter price of item here" value={menuItem.price} onChange={setValue('price')} />
                    </label>
                    <br/>
                    {/*collect image*/}
                    <br/>
                    <input type="submit" value="Create Menu Item" />
                </form>
            </AddModal>
        </div>
    );
}