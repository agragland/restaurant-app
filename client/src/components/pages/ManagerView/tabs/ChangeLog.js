import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';

import api from '../../../../api'

import "./ChangeLog.css";

const change = {
    date: '',
    time: '',
    emp_ID: '',
    item: '',
    status: '',
}

export default function ChangeLog(){
    const [changeLog, setChangeLog] = useState(change);
    
    return(
        <div className="ChangeLog">
            <h1>Change Log</h1>
            <div className="logDisplay">
                <p className="date-time">
                   <h3 style={{top: '0px', left: '0px'}}>Date</h3>
                   {
                    
                   }
               </p>
               <p className="date-time">
                    <h3 style={{top: '0px'}}>Time</h3>

               </p>
               <p className="emp_ID">
                   <h3 style={{top: '0px'}}>Employee ID</h3>

               </p>
               <p className="item">
                   <h3 style={{top: '0px'}}>Item</h3>

               </p>
               <p className="status">
                   <h3 style={{top: '0px'}}>Status</h3>

               </p>
                
            </div>
        </div>
    );
}