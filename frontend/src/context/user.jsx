import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [name, setName] = useState("");

    return (
        <UserContext.Provider value={{name, setName}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}