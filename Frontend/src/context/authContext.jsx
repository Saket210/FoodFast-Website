import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [userToken,setUserToken] = useState("");

    const contextValue = {
        backendUrl,
        userToken,
        setUserToken
    }

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setUserToken(localStorage.getItem("token"));
        }
    },[])

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;