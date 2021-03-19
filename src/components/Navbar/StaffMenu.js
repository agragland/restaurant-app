import React, {useState} from 'react';
import "./staffMenu.css"

function Modal({show, children}) {
    if (!show)
        return null;

    return (
        <div className="modal-background">
            <section className="modal-main-staff">
                {children}
            </section>
        </div>
    );
}

function DropMenu({show, children}) {
    if(!show)
        return null;

    return(
        <div className="drop-menu">
            {children}
        </div>
    );
}

export default function StaffMenu() {
    const [showModal, setShowModal] = useState(false);
    const handleModalClick = () => {
        setShowModal((prev) => !prev);
    }

    const [showEntrees, setShowEntrees] = useState(false);
    const handleEntreesClick = () => {
        setShowEntrees((prev) => !prev);
    }

    const [showAppetizers, setShowAppetizers] = useState(false);
    const handleAppetizersClick = () => {
        setShowAppetizers((prev) => !prev);
    }

    const [showSides, setShowSides] = useState(false);
    const handleSidesClick = () => {
        setShowSides((prev) => !prev);
    }

    const [showKids, setShowKids] = useState(false);
    const handleKidsClick = () => {
        setShowKids((prev) => !prev);
    }

    const [showDesserts, setShowDesserts] = useState(false);
    const handleDessertsClick = () => {
        setShowDesserts((prev) => !prev);
    }

    const [showDrinks, setShowDrinks] = useState(false);
    const handleDrinksClick = () => {
        setShowDrinks((prev) => !prev);
    }

    return (
        <div>
            <button onClick={handleModalClick} className="menu-button">Menu</button>
            <Modal show={showModal}>
                <button onClick={handleModalClick}>X</button>
                <p>
                    <button onClick={handleAppetizersClick}>Appetizers</button>
                    <DropMenu show={showAppetizers}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleEntreesClick}>Entrees</button>
                    <DropMenu show={showEntrees}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleSidesClick}>Sides</button>
                    <DropMenu show={showSides}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleKidsClick}>Kids Meals</button>
                    <DropMenu show={showKids}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleDessertsClick}>Desserts</button>
                    <DropMenu show={showDesserts}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
                <p>
                    <button onClick={handleDrinksClick}>Drinks</button>
                    <DropMenu show={showDrinks}>
                        I'm a drop menu :)
                    </DropMenu>
                </p>
            </Modal>
        </div>
    );
}