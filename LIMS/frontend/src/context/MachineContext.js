import { createContext, useReducer } from 'react'

export const MachinesContext = createContext()

export const MachinesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MACHINES':
      return { 
        machines: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        machines: [action.payload, ...state.machines] 
      }
    case 'DELETE_MACHINE':
      return{
        machines: state.machines.filter((m) => m._id !== action.payload._id )
      } 
    default:
      return state
  }
}

export const MachinesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MachinesReducer, { 
    machines: null
  })
  
  return (
    <MachinesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </MachinesContext.Provider>
  )
}