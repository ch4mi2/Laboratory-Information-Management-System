import { ServiceMachineContext } from "../context/serviceContext"
import { useContext } from "react"

export const useMachineServiceContext = () => {
  const context = useContext(ServiceMachineContext)

  if(!context) {
    throw Error('useMachineServiceContext must be used inside an ServiceMachineContextProvider')
  }

  return context
}