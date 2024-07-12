import React from "react";
import {FaShoppingBag} from 'react-icons/fa';
import navStyles from './app.module.css';


const Navbar = () => {


    return (
        <div className='header-bar'>
                <div className={navStyles.navHeader}>
                    <button className={navStyles.bag}> <FaShoppingBag /></button>
                    <h1 className={navStyles.motto}> Smart Shop </h1>
                    
                </div>
        </div>
    )
}

export default Navbar