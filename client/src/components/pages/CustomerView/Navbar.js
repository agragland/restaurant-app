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

    const handleClickHelp = () => {
        let table = handleGetTable()
        table.assistance = true
        handleUpdateTable(table)
    }

    const [showModal, setShowModal] = useState(false)
    const handleClickTable = () => {
        setShowModal((prev) => !prev)
    }

    const handleClickNum = (tableNum) => {
        updateTableNum(tableNum)
        setShowModal(false)
    }

    const tableNums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
    return(
        <>
            <nav className="CstNavbarTabs">
                <ul className= 'cst-nav-tab'>
                    <li><button className="cst-nav-button">Refills</button></li>
                    <li><button className="cst-nav-button" onClick={() => handleClickHelp}>Call Staff</button> </li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Rewards">Rewards</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Menu">Menu</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Order">Order</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/Payment">Payment</Link></li>
                    <li className="cst-nav-link"><Link className="cst-tab-text" to="/KidsCorner">Kids Corner</Link></li>
                    <li><button className="cst-nav-button" onClick={handleClickTable}>Change table</button> </li>
                </ul>
            </nav>
            <Modal show={showModal}>
                <button onClick={handleClickTable} className="x-button">X</button>
                <br/>
                {tableNums.map(tableNum => (
                    <button onClick={() => handleClickNum(tableNum)} className="table-num-button">{tableNum}</button>
                ))}
            </Modal>
        </>
    );
}