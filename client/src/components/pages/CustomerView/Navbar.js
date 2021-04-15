import React, {useState, useRef} from'react';
import {Link} from 'react-router-dom';
import {updateTableNum, getTableNum, getItems} from './tabs/OrderView'
import Modal from '../../Modal'
import "../CustomerView/Navbar.css"
import api from "../../../api"

export default function NavBar(){
    //returns value of current table
    const handleGetTable = async () => {
        return await api.getTableByNum(getTableNum())
    }
    //updates database with a new table
    const handleUpdateTable = async (table) => {
        await api.updateTable(table.table_num, table)
    }

    const [drinks, setDrinks] = useState([])                            //all drinks in the current order
    const [showModalRefills, setShowModalRefills] = useState(false)     //boolean for refills modal
    const [disableRefills, setDisableRefills] = useState([])            //boolean array for if refills have already been ordered

    const handleClickModalRefill = () => {      //when the refill button is clicked
        setShowModalRefills(true)   //show modal
        setDrinks([])

        //adds all drinks from order to drinks array
        const items = getItems()
        items.map(item => {
            api.getItemById(item).then(dbItem => {
                if(dbItem.data.data.category === "drinks") {
                    setDrinks(prev => [...prev, dbItem.data.data])
                }
            })
        })

        //initializes disableRefills to an array of falses of length = drinks.length
        let temp = []
        for(let i = 0; i < drinks.length; i++) {
            temp = [...temp, false]
        }
        setDisableRefills(temp)
    }

    const [refills, setRefills] = useState([])      //array of which drinks are getting refilled
    const handleClickRefill = ({target}) => {   //when a refill is asked for a drink
        //updates disableRefills
        let temp = [...disableRefills]
        temp[target.value] = true
        setDisableRefills(temp)

        setRefills(prev => [...prev, drinks[target.value].name])    //updates refills
    }

    const refillModalX = () => {        //when the refill modal is exited
        setShowModalRefills(false)//close refills modal

        //update table to notify lobby of refill request
        handleGetTable().then((table) => {
            let new_table = table.data.data
            new_table.refills = refills
            setRefills([])
            handleUpdateTable(new_table).then()
        })
    }

    const [showModalHelp, setShowModalHelp] = useState(false)
    const handleClickHelp = () => {     //when the assistance button is clicked
        setShowModalHelp(prev => !prev)
    }

    const generalHelp = () => {
        //update table to notify lobby of help request
        handleGetTable().then((table) => {
            let new_table = table.data.data
            new_table.assistance = true
            handleUpdateTable(new_table)
        })
    }

    const takeOrder = () => {
        //update table to notify lobby of take order manually request
        handleGetTable().then((table) => {
            let new_table = table.data.data
            new_table.manualOrder = true
            handleUpdateTable(new_table)
        })
    }

    const takeHome = () => {
        //update table to notify lobby of take home box request
        handleGetTable().then((table) => {
            let new_table = table.data.data
            new_table.takeoutBox = true
            handleUpdateTable(new_table)
        })
    }

    const [showModalTableNums, setShowModalTableNums] = useState(false)
    const handleClickTable = () => {    //when the change table button is clicked
        setShowModalTableNums((prev) => !prev)  //toggle change table modal
    }

    const handleClickNum = (tableNum) => {  //when a number is selected within the change table modal
        api.getTableByNum(getTableNum()).then(table => {
            let tempTable = table.data.data
            if(tempTable.status === "Occupied") {
                tempTable.status = "Available"
                api.updateTable(tempTable.table_num, tempTable)
            }

            updateTableNum(tableNum)            //update the table number
            setShowModalTableNums(false)  //close change table modal
            api.getTableByNum(tableNum).then(newTable => {
                tempTable = newTable.data.data
                if(tempTable.status === "Available"){
                    tempTable.status = "Occupied"
                    api.updateTable(tempTable.table_num, tempTable)
                }
            })
        })
    }

    const tableNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]  //array of all table numbers
    return(
        <>
            <nav className="CstNavbarTabs">
                <ul className= 'cst-nav-tab'>
                    <li><button className="cst-nav-button" onClick={handleClickModalRefill}>Refills</button></li>
                    <li><button className="cst-nav-button" onClick={handleClickHelp}>Call Staff</button> </li>
                    
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Menu">Menu</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Order">Order</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Payment">Payment</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/KidsCorner">Kids Corner</Link></li>
                    <li><button className="cst-nav-button" onClick={handleClickTable}>Change table</button> </li>
                </ul>
                <label className="cst-table">Table: {getTableNum()}</label>
            </nav>
            <Modal show={showModalTableNums}>
                <button onClick={handleClickTable} className="x-button">X</button>
                <br/>
                <div className="table-num-grid">
                    {tableNums.map(tableNum => (
                        <button onClick={() => handleClickNum(tableNum)} className="table-num-button">{tableNum}</button>
                    ))}
                </div>
            </Modal>
            <Modal show={showModalRefills}>
                <button onClick={refillModalX} className="x-button">X</button>
                <br/>
                {drinks.map((drink, index) => (
                    <>
                        <button className="drink-refill-button" onClick={handleClickRefill} value={index} disabled={disableRefills[index]}>{drink.name}</button>
                        <br/>
                    </>
                ))}
            </Modal>
            <Modal show={showModalHelp}>
                <button onClick={handleClickHelp} className="x-button">X</button>
                <br/><br/>
                <button onClick={generalHelp}>Staff Help</button>&nbsp;
                <button onClick={takeOrder}>Staff Take Order</button>&nbsp;
                <button onClick={takeHome}>Take home box</button>&nbsp;
            </Modal>
        </>
    );
}