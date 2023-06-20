import { MachinePartsContext } from "../context/MachinePartsContext"
import { useContext } from "react"

export const useMachinePartsContext = () => {
  const context = useContext(MachinePartsContext)

  if(!context) {
    throw Error('useMachinePartsContext must be used inside an MachinePartsContextProvider')
  }

  return context
}