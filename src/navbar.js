import React from "react";
import {FaShoppingBag} from 'react-icons/fa';

const Navbar = () => {


    return (
        <div className='header-bar'>
                <div className="header-count">
                    <h1> Smart Shop </h1>
                    <button> <FaShoppingBag /></button>
                </div>
        </div>
    )
}

export default Navbar