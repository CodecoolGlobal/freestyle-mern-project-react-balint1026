import React, { useState } from "react";

function Navbar(props) {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-nav">
                    {props.children}
                </ul>
            </nav>
        </>
    )
}

function NavItem(props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="nav-item">
            <div className="icon-buttons" onClick={() => setIsOpen(!isOpen)}>
                {props.title}
            </div>
            {isOpen && props.children}
        </li>
    )
}

export {Navbar, NavItem};