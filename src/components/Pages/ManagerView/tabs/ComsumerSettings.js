import React, {useState} from 'react';
import TimeField from 'react-simple-timefield';


import "./ConsumerSettings.css";

function ConsumerSettings(){
    const [storeHours, setStoreHours] = useState({ startTime: '', endTime: ''});

    const set = (startTime) => {
        return({target: {value} }) => {
            setStoreHours(storeHours => ({ ...storeHours, [startTime]: value}));
        }
    };
    
    return(
        <div className="ConsumerSettings">
            <form>
                <h1>Consumer Settings</h1>
                <p>To adjust the time orders will be accepted, <br/>
                    type the new time in the text box provided. <br/>
                    Use format '00:00:00' using time in 24 hours.
                </p>

                <div> Starting Time: &nbsp;&nbsp;&nbsp;&emsp; {storeHours.startTime}   </div> 
                <input placeholder="00:00:00" value={storeHours.startTime} onChange={set('startTime')} />
                <p></p>
                <div>Ending Time: &emsp;&emsp; {storeHours.endTime} </div> 
                <input placeholder="00:00:00" value={storeHours.endTime} onChange={set('endTime')}/>     
            </form>    
        </div>
    );
}

export default ConsumerSettings;