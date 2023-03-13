import { SamplesContext } from "../context/SampleContext.js";
import { useContext } from "react";

export const useSampleContext = () => {
    const context = useContext(SamplesContext)

    if(!context){
        throw Error('useSampleContext must be used inside an SampleContextProvider')   
    }
    return context
}