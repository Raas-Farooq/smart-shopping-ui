import React, {useContext, useState} from 'react';

const contextApp = React.createContext();

const MyContext = ({children}) => {

    const myMessage = "Be Helper on The Way"


    return <contextApp.Provider value={{myMessage}}>
        {children}
    </contextApp.Provider>

}

    const useGlobalContext = () => {
        return useContext(contextApp)
    }


export {useGlobalContext, MyContext}