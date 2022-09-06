import React from "react";
import './Header.css';
const icon = require('../../assets/vecna-icon1.png')

export default ({black}) => {
    return(
        <header className={black ? 'black': ''}>
            <div className="header--logo">
                <a href="/">
                    MysFlix
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={icon} alt="usuario"/>
                </a>
            </div>
        </header>
    );
}
