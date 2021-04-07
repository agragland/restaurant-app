import React, {useState} from'react';
import {Link} from 'react-router-dom';
import {updateTableNum, getTableNum, getItems} from './tabs/OrderView'
import Modal from '../../Modal'
import "../CustomerView/Navbar.css"
import api from "../../../api"

export default function NavBar(){
    const handleGetTable = async () => {
        await api.getTableByNum(getTableNum())
    }
    const handleUpdateTable = async (table) => {
        await api.updateTable(table.table_num, table)
    }
    const handleGetItemById = async (id) => {
        await api.getItemById(id)
    }

    const [drinks, setDrinks] = useState([])
    const [showModalRefills, setShowModalRefills] = useState(false)
    const handleClickModalRefill = () => {
        setShowModalRefills(true)
        setDrinks([])

        const items = getItems()
        items.map(item => {
            api.getItemById(item).then(dbItem => {
                if(dbItem.data.data.category === "drinks") {
                    setDrinks(prev => [...prev, dbItem.data.data])
                }
            })
        })
    }

    let refills = []
    const handleClickRefill = ({target}) => {
        refills = [...refills, target.value]
    }

    const refillModalX = () => {
        setShowModalRefills(false)

        let table = handleGetTable()
        table.refills = refills
        handleUpdateTable(table)
    }

    const handleClickHelp = () => {
        let table = handleGetTable()
        table.assistance = true
        handleUpdateTable(table)
    }

    const [showModalTableNums, setShowModalTableNums] = useState(false)
    const handleClickTable = () => {
        setShowModalTableNums((prev) => !prev)
    }

    const handleClickNum = (tableNum) => {
        updateTableNum(tableNum)
        setShowModalTableNums(false)
    }

    const tableNums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
    return(
        <>
            <nav className="CstNavbarTabs">
                <ul className= 'cst-nav-tab'>
                    <li><button className="cst-nav-button" onClick={handleClickModalRefill}>Refills</button></li>
                    <li><button className="cst-nav-button" onClick={handleClickHelp}>Call Staff</button> </li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Rewards">Rewards</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Menu">Menu</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Order">Order</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Payment">Payment</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/KidsCorner">Kids Corner</Link></li>
                    <li><button className="cst-nav-button" onClick={handleClickTable}>Change table</button> </li>
                </ul>
            </nav>
            <Modal show={showModalTableNums}>
                <button onClick={handleClickTable} className="x-button">X</button>
                <br/>
                {tableNums.map(tableNum => (
                    <button onClick={() => handleClickNum(tableNum)} className="table-num-button">{tableNum}</button>
                ))}
            </Modal>
            <Modal show={showModalRefills}>
                <button onClick={refillModalX} className="x-button">X</button>
                <br/>
                {drinks.map((drink, index)=> (
                    <>
                        <button onClick={handleClickRefill} value={index}>{drink.name}</button>
                        <br/>
                    </>
                ))}
            </Modal>
        </>
    );
}