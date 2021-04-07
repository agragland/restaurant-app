import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import api from '../../../api'

import StaffMenu from "../../Navbar/StaffMenu"
import ChangeLog from './tabs/ChangeLog';
import ConsumerSettings from './tabs/ComsumerSettings';
import DailySalesReport from './tabs/DailySalesReport';
import LobbyVisual from './tabs/LobbyView';
import Navbar from './Navbar';

import './ManagerView.css';

{/*manager page hub*/}
export default function ManagerView (){
    const [managers, setManagers] = useState([]);
    const [manager, setManager] = useState({ emp_id: '', password: ''});

    useEffect (() => {
        handleGetManger()
    }, []);

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

    const setValue = (variable) => {
        return({target: {value}}) => {
            setManager( manager => ({...manager, [variable]: value}));
        }
    };

    const checkLog = () => {
        managers.map((employee) => {
            if(employee.emp_id === manager.emp_id){
                if(employee.password === manager.password){
                    handleLog();
                }
            }
        })
    }


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
                
            </div> :  
            /*else, show manager log in page*/
            <div className='login' > 
                <p><br/><br/></p>
                <div className='login-box'>
                    <h3 className='login-title'>Manager Login</h3>
                    <form>
                        <label style={{ fontSize: '16px', textAlign: 'left'}}>Employee ID:
                        <input type="text" placeholder="Enter Employee ID here" value={manager.emp_id} onChange={setValue('emp_id')} />
                        </label>
                        <label style={{ fontSize: '16px', textAlign: 'left'}}>Password:
                        <input type="text" placeholder="Enter Password here" value={manager.password} onChange={setValue('password')} />
                        </label>
                    </form>
                    <button className='signin' onClick={handleLog}>Sign In</button>
                </div>
            </div>

            }
        </div>
        </>
    );
}