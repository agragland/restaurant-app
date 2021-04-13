import React, {useState} from 'react';
import TimeField from 'react-simple-timefield';


import "./ConsumerSettings.css";

export default function ConsumerSettings(){
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

                <div>
                    Starting Time: &emsp; {storeHours.startTime}
                    <input className="time-input" placeholder="00:00:00" value={storeHours.startTime} onChange={set('startTime')} />
                </div>
                <br/>
                <div>
                    Ending Time: &ensp;&emsp; {storeHours.endTime}
                    <input className="time-input" placeholder="00:00:00" value={storeHours.endTime} onChange={set('endTime')}/>
                </div>
            </form>  
        </div>
    );
}