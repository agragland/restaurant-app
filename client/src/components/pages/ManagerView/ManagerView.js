import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import api from '../../../api'

import StaffMenu from "../../Navbar/StaffMenu"
import ChangeLog from './tabs/ChangeLog';
import ConsumerSettings from './tabs/ComsumerSettings';
import DailySalesReport from './tabs/DailySalesReport';
import LobbyVisual from './tabs/LobbyView';
import Navbar from './Navbar';
import ManagerLogin from './tabs/ManagerLogin'

import './ManagerView.css';

{/*manager page hub*/}
export default function ManagerView (){
    const [managers, setManagers] = useState([]); //to store all managers from database
    const [manager, setManager] = useState({ emp_id: '', password: ''});
    const [error, setError] = useState('');

    //data base 
    useEffect (() => {
        handleGetManger()
    }, []);
    //get and store all manager employee info
    const handleGetManger = async () => {
        await api.getEmployees().then(employees => {
            const all_employees = employees.data.data

            let tempManagers = []
            all_employees.map((employee) => {
                if(employee.role === 'manager'){
                    tempManagers = [...tempManagers, employee]
                }
            })
            //set state to temp
            setManagers(tempManagers)
            console.log(managers)
        })
    }

    //manager login 
    const Login = details => {
        console.log(details)
        managers.map((employee) => {
            if(details.emp_id == employee.emp_id){ //if the user name matches
                if(details.password == employee.password){ //check the password
                    handleLog()
                }
                else{ 
                    console.log('details do not match')
                }
            }
        })
        
        
    }
    //manager logout
    const Logout = () => {
        console.log("logout");
    }

    //determines the view of the manager navbar
    const [isLogged, setIsLogged] = useState(false);
    const handleLog = () => {
        setIsLogged(!isLogged);
    }

    return (
        <>
        <div className='manager'> 
            <StaffMenu level= {3} />
            <div className='manager-title'>Manager</div>

            {/*if manager is logged in, show the navbar */}        
            { isLogged ?
            <div className='manager-body'>
               
                <Router>
                    <Navbar/>
                    
                    {/*Consumer Settings*/}
                    <Route exact path="/ConsumerSettings" component={ConsumerSettings}  />     
                    {/*DailySalesReport*/}
                    <Route exact path="/DailySalesReport" component={DailySalesReport} />  
                    {/*Change Log */}
                    <Route exact path="/ChangeLog" component={ChangeLog}  />  
                    {/*Lobby View*/}
                    <Route exact path="/LobbyView" component={LobbyVisual}  />  
                    
                </Router>

                <button onClick={handleLog}>LOGOUT</button>
                
            </div> :  
            /*else, show manager log in page*/
            <div className='login' > 
                <p><br/><br/></p>
                <ManagerLogin Login={Login} error={error} />
                
            </div>
        

            }
        </div>
        </>
    );
}