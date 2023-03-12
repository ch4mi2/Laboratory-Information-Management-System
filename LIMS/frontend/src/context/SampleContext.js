import { createContext, useReducer } from 'react'


export const SamplesContext = createContext()

export const samplesReducer = (state, action) => {
    switch(action.type){
        case 'SET_SAMPLES':
            return{
                samples: action.payload
            }
        case 'CREATE_SAMPLE':
            return{
                samples: [action.payload,...state.samples]
            }
        default:
            return state        
    }
}

export const SamplesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(samplesReducer, {
        samples: null
    })
    return(
        <SamplesContext.Provider value={{...state, dispatch}}>
            { children }
        </SamplesContext.Provider>
    )
}