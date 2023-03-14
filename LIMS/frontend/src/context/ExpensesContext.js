import { createContext, useReducer } from "react";

export const ExpensesContext = createContext()
export const expensesReducer = (state, action) =>{
    switch(action.type){
        case 'SET_EXPENSES':
            return{
                expenses: action.payload
            }
         case 'CREATE_EXPENSES':
            return{
                expenses: [action.payload, ...state.expenses]
            } 
         default:
            return state     
    }
}

export const ExpensesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expensesReducer, {
        expenses: null
    })

    

    return(
        <ExpensesContext.Provider value={{...state, dispatch}}>
            { children }

        </ExpensesContext.Provider>
    )
}