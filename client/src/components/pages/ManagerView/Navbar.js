import React from'react';
import {Link} from 'react-router-dom';

import "../ManagerView/MgrNavbar.css"

export default function NavBar(){

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