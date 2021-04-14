import React, {useState, useEffect} from 'react';
import TimeField from 'react-simple-timefield';

import api from '../../../../api';


import "./ConsumerSettings.css";

export default function ConsumerSettings(){
    const [storeHours, setStoreHours] = useState([])   //to collect 
    const [newStoreHours, setNewStoreHours] = useState({ startTime: "", endTime: ""});

    //get times that are already stored
    useEffect(() => {
        handleGetTimes()
    }, []);

    const handleGetTimes = async() => {
        await api.getTimes().then(times => {
            const curr_times = times.data.data

            let tempTimes = []
            curr_times.map((time) => {
                let tempTime = { startTime: time.startTime, endTime: time.endTime}
                
                tempTimes = [...tempTimes, tempTime]
            })
            //set states
            setStoreHours(tempTimes)
            console.log(storeHours)
        })
    };

    //set and send times
    const setValue = (variable) => {
        //console.log(variable)
        return({target: {value} }) => {
            setNewStoreHours(newStoreHours => ({ ...newStoreHours, [variable]: value}))
        }
    };

    //save
    

    //to handle update of times
    const handleUpdate = async () => {
        let { startTime, endTime} = newStoreHours
        let payload = {startTime, endTime}
        console.log(payload)
        await api.updateTime(payload._id, payload).then(res => {
            window.alert('Time Changed')
        })
    } 

    return(
        <div className="ConsumerSettings">
            <form>
                <h1>Consumer Settings</h1>
                <p>To adjust the time orders will be accepted, <br/>
                    type the new time in the text box provided. <br/>
                    Use format '00:00:00' using time in 24 hours.
                </p>

                <div className='cs-body'>
                    <h2 style={{ marginLeft: '2%', textAlign: 'left', fontSize: '24px', textDecoration: 'underline' }}>Starting Time</h2> 
                    <div>
                        <h3 style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Current: 
                            <label className="time-output">
                                {storeHours[0].startTime}
                            </label>
                        </h3>
                        
                    </div>
                    
                    <br/>
                    <div>
                        <h3 style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Change: 
                            <input type="text" className="time-input" value={newStoreHours.startTime} onChange={setValue('startTime')} />
                        </h3>
                        
                    </div>
                    
                </div>
                <br/>
                <div>
                    <h2 style={{ marginLeft: '2%', textAlign: 'left', fontSize: '24px', textDecoration: 'underline' }}>Ending Time</h2> 
                    <div>
                        <h3 style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Current: 
                            <label className="time-output">{storeHours[0].endTime}</label>
                        </h3>
                        
                    </div>
                    <br/>
                    <div>
                        <h3 style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Change: 
                            <input type="text" className="time-input" value={newStoreHours.endTime} onChange={setValue('startTime')} />
                        </h3>
                        
                    </div></div>
                <div>
                    <br/>
                    <button style={{ marginLeft: '40%'}} onClick={handleUpdate}>SAVE CHANGES</button>
                </div>
            </form>  
        </div>
    );
}