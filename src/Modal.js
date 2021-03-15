import React from "react";
import "./Modal.css"

//Uses custom-made modal, since there's a strange flashing that happens when changing bootstrap modals
export default function Modal({show, children}) {
    if (!show)
        return null;

    return (
        <div className="modal-background">
            <section className="modal-main">
                {children}
            </section>
        </div>
    );
}