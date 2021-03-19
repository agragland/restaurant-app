//assitance from: https://www.youtube.com/watch?v=fL8cFqhTHwA
import React, {Component} from 'react';
import { StaffPages } from "../pages/Pages";

import './Navbar.css'

class Navbar extends Component{
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render(){
        return(
            <nav className="NavbarPages">
                <h1 className="employee-id">Employee ID: <i className="fab fa-empID"></i></h1> {/* Still need to add inputed employee id*/}
                <div className="staff-page" onClick={this.handleClick}></div>
                <ul className={this.state.clicked ? 'nav-page active' : 'nav-page'}>
                    {StaffPages.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>

            </nav>
        );
    }

}

export default Navbar