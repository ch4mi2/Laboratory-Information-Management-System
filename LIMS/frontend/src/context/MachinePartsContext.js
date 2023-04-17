import { createContext, useReducer } from 'react'

export const MachinePartsContext = createContext()

export const MachinePartsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MACHINEPART':
      return { 
        machineParts: action.payload 
      }
    case 'CREATE_MACHINEPART':
      return { 
        machineParts: [action.payload, ...state.machineParts] 
      }
    case 'DELETE_MACHINEPART':
      return{
        machineParts: state.machineParts.filter((m) => m._id !== action.payload._id )
      } 
    default:
      return state
  }
}

export const MachinePartsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MachinePartsReducer, { 
    machineParts: null
  })
  
  return (
    <MachinePartsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </MachinePartsContext.Provider>
  )
}