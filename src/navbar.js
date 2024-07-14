import React, { useEffect, useState } from "react";
import {FaShoppingBag} from 'react-icons/fa';
import navStyles from './app.module.css';
import { useGlobalContext } from "./context";



const Navbar = () => {

    const {totalCartItems} = useGlobalContext();
    const [globalCount, setGlobalCount] = useState();
    

    useEffect(() => {
        console.log("your bought items: ", totalCartItems)
    },[totalCartItems])
    return (
        <div className={navStyles.navbarSlide}>
                <div className={navStyles.navHeader}>
                    <span className={navStyles.totalCarts}>{totalCartItems}<span style={{fontSize:"12px"}}>items</span></span>
                    <button className={navStyles.bag}> <FaShoppingBag /></button>
                    <h1 className={navStyles.motto}> Smart Shop </h1>
                    
                </div>
        </div>
    )
}

export default Navbar