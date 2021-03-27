import React from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react'

import "./ChangeLog.css";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

//change status for
const status = { remove: 'remove', add: 'add', delete: 'delete'}
//infmation stored for change log 
const log = {date: '', time: '', emp_id: '', item_id: '', changeStat: status[0]}

const changeLog = []

export default function ChangeLog(){

    return(
        <div className="ChangeLog">
            <h1>Change Log</h1>
            <div className="logDisplay">
                <AgGridReact>
                    <AgGridColumn headerName="Date" field="date" />
                    <AgGridColumn headerName="Time" field="time" />
                    <AgGridColumn headerName="Employee Id" field="emp_ID" />
                    <AgGridColumn headerName="Item Name" field="item" />
                    <AgGridColumn headerName="Change Status" field="changeStat" />
                </AgGridReact> 
               
            </div>
        </div>
    );
}