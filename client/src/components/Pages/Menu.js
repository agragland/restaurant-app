import React, { useState } from 'react';

const item = {category: '', name: '', price: '', ingredients: '', }
const vTrue = {showing: true }

    const avalibleMenu = [] 
    const unavalibleMenu = []

//access the menu - NOTE: this one is the one accessed by outside members
export default function AccessMenu(){
    const isSectionClosed = this.state.is
    const [state, setState] = useState(vTrue); //test - RENAME
    const [menuItem, setMenuItem] = useState(item);  //menu item filled from data to 

    const handleOpen = () => {
        setState = useState(state => true)
    }

    const handleClose = () => {

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

    //to add new menu item
    const addMenu = (menuItem) => {
        
    }

    return(
        <>
            <h3>Menu</h3> {/* INITGRATE WITH RYAN'S CODE*/}
            {/*Populate all items in the menu */}
            <popMenu/>
            <div className="Menu">
                {/*access menu*/}

                {/*add menu item*/}
                


            </div>
            
        </>
    )

}