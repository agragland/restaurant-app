import React from 'react'
import './App.css'
import './index.css'

import { MenuInsert, MenuList, Navbar, Time } from '../components'

function App() {
    return (
        <div className="App">Taco Palace
            <div className="bg"></div>
            <Time/>
            <Navbar />
        </div>
    );
}

export default App