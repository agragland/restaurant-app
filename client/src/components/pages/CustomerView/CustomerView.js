
import './CustomerView.css'

import StaffMenu from '../../Navbar/StaffMenu'
import api from '../../../api'

export default function CustomerView() {

    let customer = {
        name: '',
        email: '',
        phoneNumber: 0,
        birthday: '',

    };


    const handleChangeInputName = async event => {
        const name = event.target.value
        customer.name = name
    }

    const handleChangeInputEmail = async event => {
        const email = event.target.value
        customer.email = email
    }

    const handleChangeInputNumber = async event => {
        const phone = event.target.value
        customer.phoneNumber = phone
    }

    const handleChangeInputBirthday = async event => {
        const birth = event.target.value
        customer.birthday = birth
    }

    const handleSubmission = async () => {
        const {name, email, phoneNumber, birthday} = customer
        const payload = {name, email, phoneNumber, birthday}

        console.log(payload)

        await api.insertCustomer(payload).then(res => {
            window.alert(`Customer inserted successfully`)
            customer = {
                name: '',
                email: '',
                phoneNumber: 0,
                birthday: '',
            }
        })
    }



    return (
        <form>
            <StaffMenu level= {0} />
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name"
                   onChange={handleChangeInputName}
            /><br/>
            <label htmlFor="phoneNum">Phone Number:</label>
            <input type="tel" id="phoneNum" placeholder="1234566780" name="phoneNum"
                   required
                   onChange={handleChangeInputNumber}
            /><br/>
            <label htmlFor="Email">Email:</label>
            <input type="email" id="Email" name="Email" placeholder="example@yahoo.com"
                   required
                   onChange={handleChangeInputEmail}
            /><br/>
            <label htmlFor="Birthday">Birthday:</label>
            <input type="date" id="Birthday" name="Birthday"
                   onChange={handleChangeInputBirthday}
            /><br/>


            <input type="button" value="Complete Sign Up" onClick={handleSubmission}/>
        </form>

    );
}