//Electronic Restaurant - Main App.js
import './App.css';
import React, { useState, useReducer } from 'react';

const order = ["Taco 1"];

function Menu({isOpen}) {
    if(!isOpen) return null;

    return (
      <>
        <h1>THE MENU IS OPEN</h1>
        <div>
          <p>Taco 1</p>
          <button onClick={() => {
            order.push("Taco 1");
          }}>Add to order</button>
        </div>
      </>

    );
}

function Carousel() {
  const [carousel, setPage] = useState(1);
  return (
      <div  className={"btn-group"}>
        <button onClick={() => {
          if(carousel === 1)
            setPage(3)
          else
            setPage(carousel-1)
        }}>
          Page Left</button>
        <p>Current Page: {carousel}</p>
        <button onClick={() => {
          if(carousel === 3)
            setPage(1)
          else
            setPage(carousel+1)
        }}>
          Page Right</button>
      </div>
  );
}

function App() {
  const [menuOpen, toggleMenu] = useReducer(
      menuOpen => !menuOpen, false
  )
  //automatically scroll through the carousel
  return (
      <div className={"interface"}>
      <div>
      <button>Kid's Zone</button>
      <button>Taco Rewards</button>
      <Carousel/>
      <button onClick={toggleMenu}>Menu</button>
      <Menu isOpen={menuOpen}/>
      <button>Refill</button>
      <button onClick={() => console.log("Staff Called")}>Call Staff</button>
      </div>
      <div>
        <ul>
          {order.map((item,index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
      </div>
  );


}

export default App;
