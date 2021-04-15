import React from 'react';
import Clock from 'react-live-clock';

import 'moment-timezone';
import "./Clock.css";

export default function Time(){
    return(
        <div className="Time">
            <p className="big-text">Current Time:{" "}
            <Clock className="clock-display" format={'HH:mm:ss'} ticking={true} timezone={'US/Central'} />
            </p>
       </div>
    );
}