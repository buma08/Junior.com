import { createContext, useContext, useState } from "react";
const SidebarContext = createContext()

export function useSidebarContext(){
    return useContext(SidebarContext)
}
// eslint-disable-next-line react/prop-types
export function SidebarContextProvider({children}){

    const [isOpened, setIsOpened] = useState(false)
    return (
        <SidebarContext.Provider value={{isOpened, setIsOpened}}>
            {children}
        </SidebarContext.Provider>
    )
}