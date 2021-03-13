import React, {useState} from 'react';
import './LobbyView.css';

const tables = [
    "Table 1",  "Table 2",  "Table 3",  "Table 4",  "Table 5",  "Table 6",  "Table 7",  "Table 8",  "Table 9",
    "Table 10", "Table 11", "Table 12", "Table 13", "Table 14", "Table 15", "Table 16", "Table 17", "Table 18",
    "Table 19", "Table 20"
]

const Modal = ({handleClose, show, tableNum, children}) => {
    if (!show)
        return null;

    const showClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showClassName}>
            <section className="modal-main">
                <button value={tableNum} onClick={handleClose}>
                    X
                </button>
                {children}
            </section>
        </div>
    );
}

export default function TableModals() {
    const [table, setTable] = useState('');
    const [tableShow, setTableShow] = useState(false);
    const handleTableClick = ({target}) => {
        const tableNum = target.value;
        setTable(() => tableNum);
        if(tableShow === true) {
            setTableShow(() => false);
        }
        else {
            setTableShow(() => true);
        }
    };

    const [orderShow, setOrderShow] = useState(false);
    const handleOrderClick = ({target}) => {
        setTable(() => target.value);
        if(orderShow === true){
            setOrderShow(() => false);
            setTableShow(() => true);
        }
        else{
            setOrderShow(() => true);
            setTableShow(() => false);
        }
    };

    return (
        <>
            {tables.map(table => (
                <button value={table} onClick={handleTableClick}>
                    {table}
                </button>
            ))}
            <Modal show={tableShow} tableNum={table} handleClose={handleTableClick}>
                <p>{table}
                    <button value={table} onClick={handleOrderClick}>Show Order</button>
                </p>
                <p>Classic Taco</p>
                <button onClick={handleTableClick}>Complete Request</button>
            </Modal>
            <Modal show={orderShow} tableNum={table} handleClose={handleOrderClick}>
                <p>{table} Order</p>
                <p>
                    Classic Taco, $7.99
                    <button>Remove</button>
                </p>
            </Modal>
        </>
    );
};