import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

//import ManagerLogin from './tabs/ManagerLogin';
import Time from '../Clock';
import ChangeLog from './tabs/ChangeLog';
import ConsumerSettings from './tabs/ComsumerSettings';
import DailySalesReport from './tabs/DailySalesReport';
import LobbyVisual from './tabs/LobbyView';
import Navbar from './Navbar';

import './ManagerView.css';

{/*manager page hub*/}
export default function ManagerView (){
    return (
        <>
        <div className='manager'> 
           <Router>
               <Time />
                <div className='manager-title'>Manager</div>
                <div className='manager-body'>
                        {/*manager log in page*/}

                    <Navbar/>
                        {/*Consumer Settings*/}
                        <Route exact path="/ConsumerSettings" component={ConsumerSettings}  />     
                        {/*DailySalesReport*/}
                        <Route exact path="/DailySalesReport" component={DailySalesReport} />  
                        {/*Change Log */}
                        <Route exact path="/ChangeLog" component={ChangeLog}  />  
                        {/*Lobby View*/}
                        <Route exact path="/LobbyView" component={LobbyVisual}  />  
                </div>

            </Router>
        </div>
        </>
    );
}