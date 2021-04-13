import React, {useState} from'react';
import {Link} from 'react-router-dom';

import ChangeLog from './tabs/ChangeLog';
import ConsumerSettings from './tabs/ComsumerSettings';
import DailySalesReport from './tabs/DailySalesReport';
import LobbyView from './tabs/LobbyVisual';

import "./MgrNavbar.css"
import "../ManagerView/MgrNavbar.css"

export default function NavBar(){
    const [clicked, setClicked] = useState(false);
    const [component, setComponent] = useState(<ConsumerSettings/>);

    const handleClick = (e) => {
        e.preventDefault()              //blocks auto-refresh
        setClicked(() => !clicked)
        const view = e.target.name

        //chooses which view to display
        if(view === "Consumer Settings")
            setComponent(() => <ConsumerSettings />)
        else if(view === "DSR")
            setComponent(() => <DailySalesReport />)
        else if(view === "Change Log")
            setComponent(() => <ChangeLog />)
        else if(view === "Lobby View")
            setComponent(() => <LobbyView />)
    }

    return(
        <nav className="MgrNavbarTabs">
            <ul className= 'mgr-nav-tab'>
                <li class="mgr-nav-link"><Link className="mgr-tab-text" to="/ConsumerSettings">Consumer Settings</Link></li>
                <li class="mgr-nav-link"><Link className="mgr-tab-text" to="/DailySalesReport">DSR</Link></li>
                <li class="mgr-nav-link"><Link className="mgr-tab-text" to="/ChangeLog">Change Log</Link></li>
                <li class="mgr-nav-link"><Link className="mgr-tab-text" to="/LobbyView">Lobby View</Link></li>
            </ul>
        </nav>
    );
}