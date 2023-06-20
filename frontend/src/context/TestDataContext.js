import { createContext, useReducer } from 'react'

export const TestDataContext = createContext()

export const TestDataReducer = (state,action) => {
    switch(action.type) {
        case 'SET_TESTS':
            return  {
                Tests: action.payload
            }
        case 'CREATE_TEST':
            return {
                Tests: [action.payload, ...state.tests]
            }
        case 'DELETE_TEST':
            return {
                Tests: state.Tests.filter((test) => test._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const  TestDataContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(TestDataReducer, {
        Tests: null
    })   

    return(
        <TestDataContext.Provider value={{...state,dispatch}}>
            { children }
        </TestDataContext.Provider>
    )
}