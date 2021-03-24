//assitance from: https://www.youtube.com/watch?v=fL8cFqhTHwA
import React, {useState} from 'react';
import { StaffPages } from "../Pages/Pages";

import LobbyView from "../Pages/LobbyView";
import KitchenView from "../Pages/KitchenView";
import ManagerView from "../Pages/ManagerView/ManagerView";
import StaffMenu from "./StaffMenu";

import Modal from "../Modal";
import './Navbar.css'

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [component, setComponent] = useState(<LobbyView/>);
    const [showPassword, setShowPassword] = useState(true);

    const handleClick = (e) => {
        e.preventDefault()              //blocks auto-refresh
        setClicked(() => !clicked)
        const view = e.target.name

        //chooses which view to display
        if(view === "Lobby")
            setComponent(() => <LobbyView />)
        else if(view === "Kitchen")
            setComponent(() => <KitchenView />)
        else if(view === "Manager")
        {
            setComponent(() => <ManagerView />)
            //setComponent(() => <ManagerLogin />)
        }
    }

    const handlePassword = () => {
       setShowPassword(() => !showPassword)
    }

        return(
            <div>
                <StaffMenu />
                <Modal show={showPassword}>
                    <button onClick={handlePassword}>X</button>
                    <p>Insert Employee ID:</p>
                </Modal>
                {component}
                <nav className="NavbarPages">
                    <h1 className="employee-id">Employee ID: <i className="fab fa-empID"></i></h1> {/* Still need to add inputed employee id*/}
                    <ul className={clicked ? 'nav-page active' : 'nav-page'}>
                        {StaffPages.map((item, index) => {
                            return(
                                <li key={index}>
                                    <a className={item.cName} href={item.url} name={item.title} onClick={handleClick}>
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        );

}

export default Navbar