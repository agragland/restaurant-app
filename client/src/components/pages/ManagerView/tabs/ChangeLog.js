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
                tempChange.date = getDate(change.createdAt)
                tempChange.time = getTime(change.createdAt)
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

    //format time
    const getTime = (creationTime) => {
        console.log(creationTime)
        const time = new Date(creationTime)     //gets Date based on when order was created
        const hours = time.getHours()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        //converts Date to 24 hour clock, adds leading zeros if needed
        return ((hours < 10 ? '0' : '') + hours) + ":" + ((minutes < 10 ? '0' : '') + minutes) + ":" + ((seconds < 10 ? '0' : '') + seconds)
    }

    //format date
    const getDate = (creationDate) => {
        const date = new Date(creationDate)
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()

        return(year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0': '') + day)
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