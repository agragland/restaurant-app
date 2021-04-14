import React, { useState, useEffect } from 'react';
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

    //get all changes that are currently logged
    useEffect(() => {
        handleGetChanges()
        const intervalId = setInterval(() => {
            handleGetChanges()
        }, 10000);

        return() => {
            clearInterval(intervalId);
        }
    }, []);

    const handleGetChanges = async() => {
        await api.getChanges.then(changes => {
            const curr_changes = changes.data.data
            console.log(curr_changes)
            curr_changes.map((changes) => {

            })
        })
    }

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