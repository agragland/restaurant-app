import React, {useState, useEffect} from 'react';
import "./staffMenu.css"
import api from "../../api";

const Item = ({name, price,}) => (
    <p>{name} ${price}</p>
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

export default function StaffMenu({Change, level}) {
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
    const [menuItem, setMenuItem] = useState({name: '', category: '', ingredients: '', price: 0.00, img: '', isAvailable: true})
    
    //add menu item
    const [showAdd, setShowAdd] = useState(false);
    const handleAddClick = () => {
        setShowAdd((prev) => !prev);
    }  
    var canAdd; //button to access AddMenu - Manager ONLY
    if (level > 1){
        canAdd = <button onClick={handleAddClick} style={{position: 'fixed', bottom: '11%', right: '11%'}}>Add Menu Item</button>;
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
            window.alert(`Item inserted successfully`)
            setMenuItem({
                name: '',
                category: '',
                ingredients: '',
                price: 0.00,
                img: '',
                isAvailable: true
            })
        }) 

        console.log(availMenuItems)
        console.log(unavailMenuItems)
        setShowModal((prev) => !prev);
    }

    //ADD ITEM TO MENU ^^
//--------------------------------------------------------------------------------------------------------------------------
    //OTHER MENU OPTIONS vv

    //to handle update and log the change
    const handleUpdate = async (payload) => {
        console.log(payload)
        await api.updateItem(payload._id, payload).then(res => {
            window.alert('Menu item change has been submitted')
        })

    } 
    
    //remove an item from avalible menu - NOTE: this removes an item from avalible array
    //and places it into the unavalible array
    const clickToRemove = ({target}) => {
        //add item to unavailable menu
        const index = target.value
        let tempItem = availMenuItems[index]
        availMenuItems[index].isAvailable = false
        setUnavailItems((prev) => prev.concat(availMenuItems[index]))

        //update the database
        handleUpdate(availMenuItems[index])

        //remove from availible menu
        let temp = [...availMenuItems]
        temp.splice(index, 1)
        setAvailItems(() => temp)

        //record in changelog
        let tempChange = {item: tempItem.name, action: "remove"}
        Change(tempChange);
    }

    var canRemove = false; //determines if page has access clickToRemove
    if (level > 0){
        canRemove = true;
    }


    //replace an item to avalible menu - NOTE: this removes an item form unavalible
    //array and places it into the avalible array
    const clickToReplace = ({target}) => {
        //add item to available menu
        const index = target.value
        let tempItem = unavailMenuItems[index]; //used for change log
        unavailMenuItems[index].isAvailable = true;
        setAvailItems((prev) => prev.concat(unavailMenuItems[index]))

        //update the database
        handleUpdate(unavailMenuItems[index])

        //remove from unavailible menu
        let temp = [...unavailMenuItems]
        temp.splice(index, 1)
        setUnavailItems(() => temp)

        //record in changelog
        let tempChange = {item: tempItem.name, action: "replace"}
        Change(tempChange);
    }
    var canReplace = false; //determines if page has access Replace - Manager ONLY
    if (level > 1){
        canReplace = true;
    }


    //deletes an item from the unavalible array - Manager ONLY
    const DeleteMenu = ({target}) => {
        const index = target.value
        let tempItem = unavailMenuItems[index] //used for change log

        //delete from database
        handleDelete(unavailMenuItems[index])

        //remove from unavailible menu
        let temp = [...unavailMenuItems]
        temp.splice(index, 1)
        setUnavailItems(() => temp)

        //record in changelog
        let tempChange = {item: tempItem.name, action: "delete"}
        Change(tempChange);
    }
    const handleDelete = async(payload) => {
        await api.deleteItem(payload._id).then(res =>{
            window.alert('Item Deleted')
        })
        //log change to change log
    }
    
    //show unavailable menu option
    var unavailableMenu;
    if(level>0){
        unavailableMenu = <button onClick={handleUnavailableClick} style={{position: 'fixed', bottom: '11%', right: '11%'}}>Unavailable Menu</button>
    }

    //  OTHER MENU OPTIONS ^^
//--------------------------------------------------------------------------------------------------
    // ACCESSIBLE MENU vv

    return (
        <div>
            <button onClick={handleModalClick} className="menu-button">Menu</button>
            <Modal show={showModal}>
                <button onClick={handleModalClick} className="back-button">X</button>
                
                <h3 style={{textAlign: 'center', fontSize: '20px'}}>Menu</h3>
                <p>
                    <button onClick={handleAppetizersClick} className="category">Appetizers</button>
                    <DropMenu show={showAppetizers}>
                        {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'appetizers' && canRemove)
                                {
                                    return(
                                        <div className="item-container">
                                            <Item
                                            key={index}
                                            name={item.name}
                                            category={item.category}
                                            price={item.price}
                                            />
                                            <button value={index} onClick={clickToRemove}>Remove Item</button>
                                        </div>
                                    )
                                }
                                else if(item.category === 'appetizers')
                                {
                                    return(
                                        <div className="item-container">
                                            <Item
                                            key={index}
                                            name={item.name}
                                            category={item.category}
                                            price={item.price}
                                            />
                                        </div>
                                    )
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleEntreesClick} className="category">Entrees</button>
                    <DropMenu show={showEntrees}>
                        {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'entrees' && canRemove)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToRemove}>Remove Item</button>
                                    </div>)

                                }
                                else if(item.category === 'entrees')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleSidesClick} className="category">Sides</button>
                    <DropMenu show={showSides}>
                        {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'sides' && canRemove)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToRemove}>Remove Item</button> 
                                    </div>)
                                    
                                }
                                else if(item.category === 'sides')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>
                                    )
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleKidsClick} className="category">Kids Meals</button>
                    <DropMenu show={showKids}>
                        {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'kids' && canRemove)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToRemove}>Remove Item</button>
                                    </div>)
                                }
                                else if(item.category === 'kids')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleDessertsClick} className="category">Desserts</button>
                    <DropMenu show={showDesserts}>
                        {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'desserts' && canRemove)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToRemove}>Remove Item</button> 
                                    </div>)
                                    
                                }
                                else if(item.category === 'desserts')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleDrinksClick} className="category">Drinks</button>
                    <DropMenu show={showDrinks}>
                    {
                            availMenuItems.map((item, index) => {
                                if(item.category === 'drinks' && canRemove)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToRemove}>Remove Item</button> 
                                    </div>)
                                    
                                }
                                else if(item.category === 'drinks')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
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
            <button onClick={handleUnavailableClick} className="back-button">Back To Menu</button>
            <br/>
            <h3 style={{textAlign: 'center', fontSize: '20px'}}>Unavailable Menu</h3>
                <p>
                    <button onClick={handleUnavailableAppetizersClick} className="category">Appetizers</button>
                    <DropMenu show={showUnavailableAppetizers}>
                        {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'appetizers' && canReplace)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToReplace}>Replace Item</button> 
                                        <button value={index} onClick={DeleteMenu}>Delete Item</button>  
                                    </div>)
                                    
                                }
                                else if(item.category === 'appetizers')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleUnavailableEntreesClick} className="category">Entrees</button>
                    <DropMenu show={showUnavailableEntrees}>
                        {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'entrees' && canReplace)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToReplace}>Replace Item</button> 
                                        <button value={index} onClick={DeleteMenu}>Delete Item</button>  
                                    </div>)
                                    
                                }
                                else if(item.category === 'entrees')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleUnavailableSidesClick} className="category">Sides</button>
                    <DropMenu show={showUnavailableSides}>
                        {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'sides' && canReplace)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToReplace}>Replace Item</button> 
                                        <button value={index} onClick={DeleteMenu}>Delete Item</button>  
                                    </div>)
                                    
                                }
                                else if(item.category === 'sides')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleUnavailableKidsClick} className="category">Kids Meals</button>
                    <DropMenu show={showUnavailableKids}>
                        {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'kids' && canReplace)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToReplace}>Replace Item</button> 
                                        <button value={index} onClick={DeleteMenu}>Delete Item</button>  
                                    </div>)
                                    
                                }
                                else if(item.category === 'kids')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleUnavailableDessertsClick} className="category">Desserts</button>
                    <DropMenu show={showUnavailableDesserts}>
                        {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'desserts' && canReplace)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToReplace}>Replace Item</button> 
                                        <button value={index} onClick={DeleteMenu}>Delete Item</button>  
                                    </div>)
                                    
                                }
                                else if(item.category === 'desserts')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleUnavailableDrinksClick} className="category">Drinks</button>
                    <DropMenu show={showUnavailableDrinks}>
                    {
                            unavailMenuItems.map((item, index) => {
                                if(item.category === 'drinks' && canReplace)
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                        <button value={index} onClick={clickToReplace}>Replace Item</button> 
                                        <button value={index} onClick={DeleteMenu}>Delete Item</button>  
                                    </div>)
                                }
                                else if(item.category === 'drinks')
                                {
                                    return(
                                    <div className="item-container">
                                        <Item
                                        key={index}
                                        name={item.name}
                                        category={item.category}
                                        price={item.price}
                                        />
                                    </div>)
                                }
                                else
                                    return null;
                            })
                        }
                    </DropMenu>
                </p>
                {canAdd}
            </UnavailableModal>  
               

    
    {/* UNACCESSIBLE MENU ^^
    --------------------------------------------------------------------------------------------------
        ADD ITEM TO MENU vv */}    

            <AddModal show={showAdd}>
                <button onClick={handleAddClick}>X</button>
                <form onSubmit={AddMenu}>
                    {/*enter name*/}
                    <label>
                    Name: &emsp;
                    <input type="text" className="add-item-input" placeholder="Enter name of item here" value={menuItem.name} onChange={setValue('name')} />
                    </label>
                    <br/>
                    {/*select category*/}
                    <label>
                        Category:
                        <select value={menuItem.category} onChange={setValue('category')} >
                            <option value="entrees">Entrees</option>
                            <option value="appetizers">Appetizers</option>
                            <option value="sides">Sides</option>
                            <option value="kids">Kids</option>
                            <option value="desserts">Desserts</option>
                            <option value="drinks">Drink</option>
                        </select>
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
                        <input type="text" className="add-item-input" placeholder="Enter price of item here" value={menuItem.price} onChange={setValue('price')} />
                    </label>
                    <br/>
                    {/*collect image*/}
                    <br/>
                    <input className="submit" type="submit" value="Create Menu Item" />
                </form>
            </AddModal>
        </div>
    );
}