//Electronic Restaurant - Main App.js
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import TableModals from "./components/pages/LobbyView";
//import ________ form "./components/pages/KitchenView";

function App() {
  return (
    <div className="App">Taco Palace
      <div className="bg"></div>
      <TableModals />
      <Navbar />
    </div>
  );
}

export default App;
