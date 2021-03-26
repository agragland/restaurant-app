import React from 'react'
import './App.css'
import './index.css'

import { MenuInsert, MenuList, Navbar } from '../components'

function App() {
    return (
        <div className="App">Taco Palace
            <div className="bg"></div>
            <Navbar />
            <MenuList />
        </div>
    );
}

export default App