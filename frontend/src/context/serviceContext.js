import { createContext, useReducer } from 'react'

export const ServiceMachineContext = createContext()

export const ServiceMachineReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MACHINESERVICE':
      return { 
        machineServices: action.payload 
      }
    case 'CREATE_MACHINESERVICE':
      return { 
        machineServices: [action.payload, ...state.machineServices] 
      }
    case 'DELETE_MACHINESERVICE':
      return{
        machineServices: state.machineServices.filter((m) => m._id !== action.payload._id )
      } 
    default:
      return state
  }
}

export const ServiceMachineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer( ServiceMachineReducer, { 
    machineServices: null
  })
  
  return (
    <ServiceMachineContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ServiceMachineContext.Provider>
  )
}