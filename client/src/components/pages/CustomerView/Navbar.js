import React from'react';
import {Link} from 'react-router-dom';

import "../CustomerView/Navbar.css"

export default function NavBar(){

    return(
        <nav className="CstNavbarTabs">
            <ul className= 'cst-nav-tab'>
                <li><button>Refills</button></li>
                <li class="cst-nav-link"><Link className="cst-tab-text" to="/Rewards">Rewards</Link></li>
                <li class="cst-nav-link"><Link className="cst-tab-text" to="/Menu">Menu</Link></li>
                <li class="cst-nav-link"><Link className="cst-tab-text" to="/Order">Order</Link></li>
                <li class="cst-nav-link"><Link className="cst-tab-text" to="/Payment">Payment</Link></li>
                <li className="cst-nav-link"><Link className="cst-tab-text" to="/KidsCorner">Kids Corner</Link></li>
                <li><button>Call Staff</button> </li>
            </ul>
        </nav>
    );
}