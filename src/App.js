//Electronic Restaurant - Main App.js
import './App.css';
import Navbar from "./components/Navbar/Navbar"

import AccessMenu from "./components/Navbar/StaffMenu";

function App() {
  return (
    //<div className="App">Taco Palace
     // <div className="bg"></div>
     // <Navbar />
    //</div>
    <div className="App">
      <AccessMenu level = {2}/>
    </div>
  );
}

export default App;
