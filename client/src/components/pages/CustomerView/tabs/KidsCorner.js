import React, {useState} from 'react';
import {Link, Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'

import TacoSweeper from '../../../../games/TacoSweeper/TacoSweeper'
import TacoSnek from '../../../../games/TacoSnek/App'
import tictacotac from '../../../../games/tictactaco/App'

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

//makes modal
function GameModal({show, children}) {
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

export const GamePages = [
    {
        title: "Taco Sweeper",
        url: "#",
        cName: 'nav-links'
    },
    {
        title: "Taco Snake",
        url: "#",
        cName: 'nav-links'
    },
    {
        title: "Tic Taco Toe",
        url: "#",
        cName: 'nav-links'
    }
]

export default function KidsCorner(){
    const [showModal, setShowModal] = useState(true)
    const [showGameModal, setShowGameModal] = useState(false)
    const [component, setComponent] = useState()
    const [exitPassword, setExitPassword] = useState("")        //text that changes with input
    const [parentPassword, setParentPassword] = useState("")    //sets password needed to leave kids center
    const [error, setError] = useState('');
    const [isSet, setIsSet] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    //handle modal
    const handleModal = () => {
        setShowModal(() => !showModal)
    }
    //handle game modal
    const handleGameModal = () => {
        setShowGameModal(() => !showGameModal)
    }

    //GAMES
    //chooses which game to play
    let gameHeader = ''
    const handleGame = (e) => {
        e.preventDefault() //blocks auto refresh
        handleGameModal()
        const game = e.target.name

        //choose which game to play
        if(game === "Taco Sweeper"){
            setComponent(() => <TacoSweeper/>)
            console.log(gameHeader)
        }
        else if(game === "Taco Snake"){
            setComponent(() => <TacoSnek/>)
            console.log(gameHeader)
        }
        else if(game === "Tic Taco Toe"){
            setComponent(() => <tictacotac/>)
        }
    }

    //LOGIN/OUT
    //parent logout
    const Logout = () => {
        console.log(exitPassword === parentPassword)
        //split into two seperate if statements to avoid multiple login errors
        console.log(exitPassword)
        console.log(parentPassword)
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
        <>
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
                            <label>Enter Exiting Password:</label>
                            <input type="text" title="password" onChange={handleExitPassword()} />
                        </div>
                        <div>
                            <button onClick={submitExit}>Exit Kids Corner</button>
                        </div>
                    </div>
                </form>
                :
                <div className="signin-form">
                    <div className='form-inner'>
                        <ul>
                            {GamePages.map((item, index) => {
                                return(
                                    <li key={index}>
                                        <a href={item.url} name={item.title} onClick={handleGame}>
                                            {item.title} <br/>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
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
                        <input type="text" title="password" value={parentPassword} onChange={handleParentPassword()} />
                    </div>
                    <div>
                        <button onClick={submitEnter}>Set Password</button>
                    </div>
                    <div>
                        <Link className="cst-tab-text" to="/Order">Back to Restaurant</Link>
                    </div>
                </div>
            </form>

            }
            
        </Modal>
        <GameModal show={showGameModal}>
            <div style={{ marginTop: '10%', backgroundColor: 'lightgray', height: '78%'}}>
                <div>
                    <button onClick={handleGameModal}>Back to Games</button>
                    {component} 
                </div>
            </div>
        </GameModal>
        </>
    )
}