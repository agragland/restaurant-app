//assitance from: https://www.youtube.com/watch?v=fL8cFqhTHwA
import React, {useState, useEffect} from 'react';
import { StaffPages, LobbyView, KitchenView, ManagerView, CustomerView} from '../pages/index'
import api from '../../api';
import './Navbar.css'

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

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [component, setComponent] = useState(<CustomerView/>);
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});
    const [error, setError] = useState('');

    //get and store all employee info
    const handleGetLobby = async () => {
        await api.getEmployees().then(workers => {
            const all_employees = workers.data.data
            console.log(all_employees);
            let tempType = []
            all_employees.map((worker) => {
                if(worker.role === "lobby"){
                    tempType = [...tempType, worker]
                }
            })
            //set state to temp
            console.log(tempType)
            setEmployees(tempType)
           //console.log(employees)
        })
    }
        //get and store all employee info
        const handleGetKitchen = async () => {
            await api.getEmployees().then(workers => {
                const all_employees = workers.data.data
                console.log(all_employees);
                let tempType = []
                all_employees.map((worker) => {
                    if(worker.role === "kitchen"){
                        tempType = [...tempType, worker]
                    }
                })
                //set state to temp
                console.log(tempType)
                setEmployees(tempType)
               //console.log(employees)
            })
        }

    //employee login
    const Login = details => {
        console.log(details)
        employees.map((worker) => {
            //split into two seperate if statements to avoid multiple login errors
            if(details.emp_id == worker.emp_id){ //if the user name matches
                setEmployee(worker)
                handleModal();
            }
            else{
                setError('Credentials do not match. Please try again.');
            }
        })
    }

    //employee signin
    const setValue = (variable) => {
        return({target: {value}}) => {
            setEmployee( employee => ({...employee, [variable]: value}));
        }
    };

    //adds a change from manager
    const Change = async (details) => {
        let change = ({item: details.item, action: details.action, emp: employee})
        const payload = change

        //add to database
        await api.insertChange(payload).then(res => {
            window.alert(`Change inserted seccessfully`)
            change = {
                item: '',
                action: '',
                emp: employee._id,
            }
        }) 
    }

    const submitHandler = e => {
        e.preventDefault(); //prevents duplicate entries

        Login(employee)
        console.log(error)
    }

    const handleClick = (e) => {
        e.preventDefault()              //blocks auto-refresh
        setClicked(() => !clicked)
        const view = e.target.name

        //chooses which view to display
        if(view === "Lobby"){
            setComponent(() => <LobbyView Change={Change}/>)
            handleModal();
            handleGetLobby();
        }
        else if(view === "Kitchen"){
            setComponent(() => <KitchenView />)
            handleModal();
            handleGetKitchen();
        }
        else if(view === "Manager"){
            setComponent(() => <ManagerView />)
        }
        else if(view === "Customer"){
            setComponent(() => <CustomerView />)
            setShowModal(() => false)
        }
    }

    const handleModal = () => {
       setShowModal(() => !showModal)
    }

    return(

        <div>
            <Modal show={showModal}>
                <form className="signin-form" onSubmit={submitHandler}>
                <div className='form-inner'>
                    <h2>Employee Login</h2>
                    {error}
                    <div className='form-group'>
                        <label  htmlFor='empoyee id'>Employee ID:</label>
                        <input type="text" placeholder="Enter Employee ID here" onChange={setValue('emp_id')} />
                    </div>
                    <input type='submit' value='LOGIN' />
                    <br/>
                    <button name={"Customer"} onClick={handleClick} >Back To Customer</button>
                </div>
                </form>
            </Modal>
            {component}
            <nav className="NavbarPages">
                <p className="employee-id">Taco Palace</p> {/* Still need to add inputed employee id*/}
                <ul className={clicked ? 'nav-page active' : 'nav-page'} >
                    {StaffPages.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url} name={item.title} onClick={handleClick}>
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );

}

export default Navbar;