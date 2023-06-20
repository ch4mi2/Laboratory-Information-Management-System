import { MachinesContext } from "../context/MachineContext"
import { useContext } from "react"

export const useMachineContext = () => {
  const context = useContext(MachinesContext)

  if(!context) {
    throw Error('useMachinesContext must be used inside an MachinesContextProvider')
  }

  return context
}