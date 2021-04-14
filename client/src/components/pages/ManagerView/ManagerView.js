import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import api from '../../../api'

import StaffMenu from "../../Navbar/StaffMenu"
import ChangeLog from './tabs/ChangeLog';
import ConsumerSettings from './tabs/ComsumerSettings';
import DailySalesReport from './tabs/DailySalesReport';
import LobbyVisual from './tabs/LobbyVisual';
import Navbar from './Navbar';
import ManagerLogin from './tabs/ManagerLogin'

import './ManagerView.css';

{/*manager page hub*/}
export default function ManagerView (){
    const [managers, setManagers] = useState([]); //to store all managers from database
    const [manager, setManager] = useState({ emp_id: '', name: '', password: '', role: '', _id: ''});
    const [error, setError] = useState('');
    const [isLogged, setIsLogged] = useState(false); //allows access to manager menu when true 

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
        console.log(managers)
        managers.map((employee) => {
            //split into two seperate if statements to avoid multiple login errors
            if(details.emp_id == employee.emp_id){ //if the user name matches
                
                if(details.password == employee.password){ //check the password
                    setManager((prev) => (employee));
                    handleLog();
                    console.log(manager)
                }
                else{ 
                    setError('Credentials do not match. Please try again.');
                }
            }
        })
        
        
    }
    //manager logout
    const Logout = () => {
        console.log("logout");
        handleLog();
    }

    //determines the view of the manager navbar
    const handleLog = () => {
        setIsLogged(!isLogged);
    }

    //adds a change from manager
    const Change = async (details) => {
        let change = ({item: details.item, action: details.action, emp: manager})
        const payload = change

        console.log(payload)
        //add to database
        await api.insertChange(payload).then(res => {
            window.alert(`Change inserted seccessfully`)
            change = {
                item: '',
                action: '',
                emp: manager._id,
            }
        }) 
    }

    return (
        <>
        <div className='manager'> 
            <div className='manager-title'>Manager</div>

            {/*if manager is logged in, show the navbar */}        
            { isLogged ?
            <div className='manager-body'>
               <StaffMenu Change={Change} level= {2}/>
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

                <button className='logout' onClick={Logout}>LOGOUT</button>
                
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