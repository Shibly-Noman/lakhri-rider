import * as React from "react";
import { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native";

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    React.useEffect(async ()=>{
        setUser(JSON.parse(await SecureStore.getItemAsync("userData")));
    }, [])

    const requestHeader =  {
        headers: { Authorization: `Bearer ${user && user.token}` }
        }

    const value = {
        user,
        setUser,
        requestHeader
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}