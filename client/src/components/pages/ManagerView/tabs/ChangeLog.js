import React, { useState, useMemo } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

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
    const [changeLog, setChangeLog] = useState([]);

    //render all sales
    const renderChange = (change, index) => {
        return(
            <tr key={index}>
                <td>{change.name}</td>
                <td>{change.price}</td>
                <td>{change.quantity}</td>
                <td>{change.price * change.quantity}</td>
            </tr>
        )
    }
    
    return(
        <div className="ChangeLog">
            <h1>Change Log</h1>
            <div className="logDisplay">
                <ReactBootStrap.Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Employee ID</th>
                        <th>Item</th>
                        <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {changeLog.map(renderChange)}
                    </tbody>
                </ReactBootStrap.Table>
                
            </div>
        </div>
    );
}