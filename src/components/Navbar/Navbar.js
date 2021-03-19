//assitance from: https://www.youtube.com/watch?v=fL8cFqhTHwA
import React, {Component} from 'react';
import { StaffPages } from "../Pages/Pages";
import LobbyView from "../Pages/LobbyView";
import KitchenView from "../Pages/KitchenView";
import ManagerView from "../Pages/ManagerView";
import StaffMenu from "./StaffMenu";
import './Navbar.css'

class Navbar extends Component{
    state = { clicked: false, component: <LobbyView /> }

    handleClick = (e) => {
        e.preventDefault()
        this.setState({ clicked: !this.state.clicked})  //blocks auto-refresh
        const view = e.target.name

        //chooses which view to display
        if(view === "Lobby")
            this.setState({component: <LobbyView />})
        else if(view === "Kitchen")
            this.setState({component: <KitchenView />})
        else if(view === "Manager")
            this.setState({component: <ManagerView />})    // needs to implement Manager view first :(
    }

    render(){
        return(
            <div>
                <StaffMenu />
                {this.state.component}
                <nav className="NavbarPages">
                    <h1 className="employee-id">Employee ID: <i className="fab fa-empID"></i></h1> {/* Still need to add inputed employee id*/}
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