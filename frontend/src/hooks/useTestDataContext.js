import { TestDataContext } from "../context/TestDataContext";
import { useContext } from "react";

export const useTestDataContext = () => {
    const context = useContext(TestDataContext)

    if(!context){
        throw Error('useTestDataContext must be used inside an TestDataContextProvider')   
    }

    return context
}