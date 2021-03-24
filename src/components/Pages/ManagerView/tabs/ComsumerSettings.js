import React, {useState} from 'react';

import "./ConsumerSettings.css"

export default function ConsumerSettings(){
    const [startTime, setStartTime] = useState("0");
    const [endTime, setEndTime] = useState("0");


    const handleStart = () =>{

    } 

    const handleEnd = () =>{

    }

    return(
        <div className="ConsumerSettings">
            <h1>Consumer Settings</h1>
            <p>Adjust time orders will be accepted</p>
            <div>
                Starting Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input id="txtStartTime" type="text" name="startTime" placeholder="Enter Start Time"/>
                <button className="save-btn" onClick="handleStart()">Save</button>           
            </div>
            <div>
                Ending Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input id="txtEndTime" type="text" name="endTime" placeholder="Enter End Time"/>
                <button className="save-btn" onClick="handleEnd()">Save</button>
            </div>
        </div>
    );
}