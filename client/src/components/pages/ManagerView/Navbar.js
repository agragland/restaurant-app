import React, {useState} from'react';
import {Link} from 'react-router-dom';

import ChangeLog from './tabs/ChangeLog';
import ConsumerSettings from './tabs/ComsumerSettings';
import DailySalesReport from './tabs/DailySalesReport';
import LobbyView from './tabs/LobbyView';
import {Tabs} from './tabs/Tabs'

import "./Navbar.css"

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
        <nav className="NavbarTabs">
            <ul className= 'nav-tab'>
                <li class="nav-link"><Link className="tab-text" to="/ConsumerSettings">Consumer Settings</Link></li>
                <li class="nav-link"><Link className="tab-text" to="/DailySalesReport">DSR</Link></li>
                <li class="nav-link"><Link className="tab-text" to="/ChangeLog">Change Log</Link></li>
                <li class="nav-link"><Link className="tab-text" to="/LobbyView">Lobby View</Link></li>
            </ul>
        </nav>
    );
}