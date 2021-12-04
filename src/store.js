import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const StoreContext = createContext();

export function useStore(){
    return useContext(StoreContext);
}

export function StoreProvider({children}){
    const [userID, setUserID] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [orders, setOrders] = useState(null);

    useEffect(()=>{

    })


    const value = {
        something
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}