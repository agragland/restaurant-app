import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

import api from '../../../../api'

import "./ChangeLog.css";

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
        await api.getChanges().then(changes => {
            const curr_changes = changes.data.data
            console.log(curr_changes)
            
            let tempChanges = []
            curr_changes.map((change) => {
                let tempChange = {date: '', time: '', emp_id: '', item: '', change: ''}
                tempChange.date = change.createdAt.slice(0,10)
                tempChange.time = change.createdAt.slice(11,19)
                tempChange.emp_id = change.emp.emp_id
                tempChange.item = change.item
                tempChange.change = change.action

                tempChanges = [...tempChanges, tempChange]
            })
            //set states
            setChangeLog(tempChanges) 
            console.log(tempChanges)
        })
    }

    //render all sales
    const renderChange = (change, index) => {
        return(
            <tr key={index}>
                <td>{change.date}</td>
                <td>{change.time}</td>
                <td>{change.emp_id}</td>
                <td>{change.item}</td>
                <td>{change.change}</td>
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