//assitance from: https://www.youtube.com/watch?v=fL8cFqhTHwA
import React, {Component} from 'react';
import { StaffPages } from "../Pages/Pages";
import LobbyView from "../LobbyView";
import KitchenView from "../KitchenView";
import './Navbar.css'

class Navbar extends Component{
    state = { clicked: false, component: <LobbyView /> }

    handleClick = (e) => {
        e.preventDefault()
        this.setState({ clicked: !this.state.clicked})
        const view = e.target.name
        if(view === "Lobby")
            this.setState({component: <LobbyView />})
        else if(view === "Kitchen")
            this.setState({component: <KitchenView />})     //needs to implement Kitchen view first :(
        else if(view === "Manager")
            this.setState({})//component: <ManagerView />})     needs to implement Manager view first :(
    }

    render(){
        return(
            <div>
                {this.state.component}
                <nav className="NavbarPages">
                    <h1 className="employee-id">Employee ID: <i className="fab fa-empID"></i></h1> {/* Still need to add inputed employee id*/}
                    <div className="staff-page" onClick={this.handleClick}></div>
                    <ul className={this.state.clicked ? 'nav-page active' : 'nav-page'}>
                        {StaffPages.map((item, index) => {
                            return(
                                <li key={index}>
                                    <a className={item.cName} href={item.url} name={item.title} onClick={this.handleClick}>
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

}

export default Navbar