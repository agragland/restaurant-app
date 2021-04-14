import React, {useState, useEffect} from 'react';
import TimeField from 'react-simple-timefield';

import api from '../../../../api';


import "./ConsumerSettings.css";

export default function ConsumerSettings(){
    const [storeHours, setStoreHours] = useState([])   //to collect 
    const [newStoreHours, setNewStoreHours] = useState({ startTime: "", endTime: "", _id: ""});

    //get times that are already stored
    useEffect(() => {
        handleGetTimes()
    }, []);

    const handleGetTimes = async() => {
        await api.getTimes().then(times => {
            const curr_times = times.data.data
            console.log(curr_times)
            let tempTimes = []
            curr_times.map((time) => {
                let tempTime = time
                
                tempTimes = [...tempTimes, tempTime]
            })
            //set states
            setStoreHours(tempTimes[0])
            console.log(storeHours)
        })
    };

    //set times
    const setNewValue = (variable) => {
        return({target: {value} }) => {
            setNewStoreHours(newStoreHours => ({ ...newStoreHours, [variable]: value}))
            console.log(newStoreHours)
        }
    };

    //prepare new time to update
    const prepTimeChange = () => {
        //get current data
        let tempTime = storeHours;
        if(newStoreHours.startTime !== ""){
            tempTime.startTime = newStoreHours.startTime;
        }
        if(newStoreHours.endTime !== ""){
            tempTime.endTime = newStoreHours.endTime;
        }   
        
                
        handleUpdate(tempTime)
    };

    //update with new time
    const handleUpdate = async(payload) => {
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
                </p>
                <h2 style={{ fontSize: '18px' }}> Use format 'HH:MM:SS'</h2> 

                <div className='cs-body'>
                    <h3 style={{ marginLeft: '2%', textAlign: 'left', fontSize: '24px', textDecoration: 'underline' }}>Starting Time</h3> 
                    <div>
                        <p style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Current: 
                            <label className="time-output">
                                {storeHours.startTime}
                            </label>
                        </p>
                        
                    </div>
                    
                    <br/>
                    <div>
                        <p style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Change: 
                            <input type="text" className="time-input" value={newStoreHours.startTime} onChange={setNewValue('startTime')} />
                        </p>
                        
                    </div>
                    
                </div>
                <br/>
                <div>
                    <h3 style={{ marginLeft: '2%', textAlign: 'left', fontSize: '24px', textDecoration: 'underline' }}>Ending Time</h3> 
                    <div>
                        <p style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Current: 
                            <label className="time-output">{storeHours.endTime}</label>
                        </p>
                        
                    </div>
                    <br/>
                    <div>
                        <p style={{ marginLeft: '10%', textAlign: 'left', fontSize: '18px' }}>
                            Change: 
                            <input type="text" className="time-input" value={newStoreHours.endTime} onChange={setNewValue('endTime')} />
                        </p>
                        
                    </div></div>
                <div>
                    <br/>
                    <button style={{ marginLeft: '40%'}} onClick={prepTimeChange}>SAVE CHANGES</button>
                </div>
            </form>  
        </div>
    );
}