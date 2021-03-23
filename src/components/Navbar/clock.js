import React, {useState, useEffect} from 'react';
import "./clock.css"

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(() => new Date());
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <section className="clock">
                <p className="time">
                    {time.toLocaleTimeString()}
                </p>
            </section>
        </div>
    )
}