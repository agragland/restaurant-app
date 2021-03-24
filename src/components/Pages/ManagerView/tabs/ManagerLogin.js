//manager log in -> directs to manager view
import React, {useState} from 'react';

import ManagerView from "../ManagerView";

import "./ManagerLogin.css";

const masterPassword = {password: "123456789"}

export default function ManagerLogin(){
    /*const [password, setPassword] = useState('');

    const handlePassword = (text) =>{
        this.setState({ password: text })
        //if(text === masterPassword)
        //{
            return <ManagerView />
        //}
        //else
        //{
            //alert("Password not recognized,", "please try again.");
        //}
    }

   
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
    //bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleRemount.bind(this);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isVisible: false
        }, function(){
            console.log(this.state.isVisible)
        });
        return false;
    }
    
    function Input(){
        return <div className='Input'>
            <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autocomplete='false' />
            <label for={ this.props.name }></label>
        </div>
    }*/
    
    return(
        <div className="login">
            <h1 className="login-title">Log-in</h1>
            <div className="login-body">
                <div className="login-box">
                    {/*<logo></logo>*/}
                    <menu>Manager Login</menu>
                    {/*<form name="managerPassword">
                        <label>Password:&nbsp;&nbsp;&nbsp;</label>
                        <input id="txtPassword" type="text" name="txtPassword" placeholder="Enter Password"/>
                        <button className="signin" onClick={handlePassword} >Sign In</button> 
                    </form>*/}
                </div>
            </div>

        </div>
    )
}
/*
function LoginComponent(){
    const [visible, isVisible] = setState(1);

    //bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleRemount.bind(this);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isVisible: false
        }, function(){
            console.log(this.state.isVisible)
        });
        return false;
    }

    const handleRemount = (e) => {
        this.setState({
            isVisible: true
        }, function(){
            console.log(this.state.isVisible)
        });
        e.preventDefault();
    }

    return(
        //const for React CSS transition declaration
        let component = this.state.isVisible ? <Modal onSubmit={
            this.handleSubmit } key='modal'/> : <ModalBack onClick={ this.handleRemount } key='bringitback' />;

            return <ReactCSSTG transitionName="animation" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}> 
            { component }
            </ReactCSSTG>
    );

    function Modal() {
        return <div className='Modal'>
            <Logo />
            <form onSubmit={ this.props.onSubmit }>
                <Input type='password' name='password' placeholder='password' />
                <button>Sign In</button> 
            </form>
        </div>   
    }
    
    //generic input field
    class Input extends React.Component {
        render(){
            return <div className='Input'>
                <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autocomplete='false' />
                <label for={ this.props.name }></label>
            </div>
        }
    }

    //logo
    class Logo extends React.Component {
        render(){
            return <div className="logo">
                <i className="fa fa-bug" aria-hidden="true"></i>
                <spam>Manager Login</spam>
            </div>
        }
    }

    class ModalBack extends React.Component {
        render() {
            return <button className="tryAgain" onClick={ this.props.onClick } key={ this.props.className }>Try again.</button>
        }
    }
}  */  

