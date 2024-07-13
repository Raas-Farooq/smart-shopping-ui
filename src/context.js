import React, {useContext, useState} from 'react';
import shoppingItems from "./shoppingItems";

const contextApp = React.createContext();


const MyContext = ({children}) => {

    const cartsCount = shoppingItems.length;
    console.log("cartsCount: ", cartsCount);
    // const [increaseItem, setIncreaseItem] = useState(1);
    // const [decreaseItem, setDecreaseItem] = useState(1);

    const [totalCartItems, setTotalCartItems] = useState(cartsCount);


    const handleGlobalIncrease = () => {
        setTotalCartItems(totalCartItems+1)
    }

    const handleGlobalDecrease = () => {
        setTotalCartItems(totalCartItems-1)
    }

    const clearAll = () => {
        setTotalCartItems(0)
    }


    return <contextApp.Provider value={{
        totalCartItems,
        handleGlobalDecrease,
        handleGlobalIncrease,
        clearAll
        }}
        >

        {children}
    </contextApp.Provider>

}

    const useGlobalContext = () => {
        return useContext(contextApp)
    }


export {useGlobalContext, MyContext}