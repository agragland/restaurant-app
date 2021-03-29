import React, {useState} from 'react';
import TimeField from 'react-simple-timefield';


import "./ConsumerSettings.css";

export default function ConsumerSettings(){
    const [startTime, setStartTime] = useState("0");
    const [endTime, setEndTime] = useState("0");


    const changeStartTime=(time)=>{
        this.setStartTime({time});
    } 

    const changeEndTime=(time)=>{
        this.setEndTime({time});
    }

    return(
        <div className="ConsumerSettings">
            <h1>Consumer Settings</h1>
            <p>Adjust the time orders will be accepted</p>
            <div>
                {/*Starting Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TimeField value={startTime} onChange={this.changeStartTime} />
                <input id="txtStartTime" type="text" name="startTime" placeholder="Enter Start Time" />
                <button className="save-btn" onClick="saveStart()">Save</button>           
            </div>
            <p></p>
            <div>
                Ending Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input id="txtEndTime" type="text" name="endTime" placeholder="Enter End Time"/>
                <button className="save-btn" onClick="saveEnd()">Save</button>*/}
            </div>
        </div>
    );
}