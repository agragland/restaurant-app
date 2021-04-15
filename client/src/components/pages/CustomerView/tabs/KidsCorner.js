import React, {useState} from 'react'

//import App from '../../../../../../games/TacoFloat'

import './KidsCorner.css'

//makes modal
function Modal({show, children}) {
    if (!show)
        return null;

    return (
        <div className="employee-modal-background">
            <section className="employee-modal-main-staff">
                {children}
            </section>
        </div>
    );
}

export default function KidsCorner(){
    const [showModal, setShowModal] = useState(true)
    const [exitPassword, setExitPassword] = useState("")        //text that changes with input
    const [parentPassword, setParentPassword] = useState("")    //sets password needed to leave kids center
    const [gameLinks, setGameLinks] = useState([])              //will list all links to games
    const [error, setError] = useState('');
    const [isSet, setIsSet] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    //handle modal
    const handleModal = () => {
        setShowModal(() => !showModal)
    }
    //parent logout
    const Logout = () => {
        console.log(exitPassword === parentPassword)
        //split into two seperate if statements to avoid multiple login errors
        if((exitPassword === parentPassword)){ //if the password
            handleModal();
        }
        else{
            setError('Credentials do not match. Please try again.');
        }
    }

    //parent login
    const submitEnter = e => {
        e.preventDefault(); //prevents duplicate entries
        handleLog()
    }

    const submitExit = e => {
        e.preventDefault(); //prevents duplicate entries
        Logout()
    } 

    //set the value of an input 
    const handleParentPassword = () => {
        return({target: {value}}) => {
            setParentPassword(value);
        }
        
    };
    const handleExitPassword = () => {
        return({target: {value}}) => {
            setExitPassword(value)
        }
    }

    const handleLog = () => {
        setIsSet(!isSet);
    }
    const handleExit = () => {
        setIsExiting(!isExiting);
    }

    return(
        <Modal show={showModal}>
            {isSet ? 
            <div>
                {isExiting ?
                <form className="signin-form">
                    <div className='form-inner'>
                        <h2>Kids Corner</h2>
                        {error}
                        {/*enter parent password*/}
                        <div className='form-group'>
                            <label  htmlFor='password'>Enter Exiting Password:</label>
                            <input type="text" value={exitPassword} onChange={handleExitPassword()} />
                        </div>
                        <div>
                            <button onClick={submitExit}>Exit Kids Corner</button>
                        </div>
                    </div>
                </form>
                :
                <div className="signin-form">
                    <div className='form-inner'>
                        <button onClick={handleExit} style={{ marginTop: '-50px'}}>
                            Exit Kids Corner
                        </button>
                    </div>
                </div>
                }    
            </div>
             :
            <form className="signin-form">
                <div className='form-inner'>
                    <h2>Kids Corner</h2>
                    {error}
                    {/*enter parent password*/}
                    <div className='form-group'>
                        <label  htmlFor='password'>Enter Parent Password:</label>
                        <input type="text" value={parentPassword} onChange={handleParentPassword()} />
                    </div>
                    <div>
                        <button onClick={submitEnter}>Set Password</button>
                    </div>
                    <div>
                        <button onclick={handleModal}>Back to Restaurant</button>
                    </div>
                </div>
            </form>

            }
            
        </Modal>
    )
}