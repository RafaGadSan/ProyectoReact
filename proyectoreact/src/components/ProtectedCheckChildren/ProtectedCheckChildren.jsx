/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export const ProtectedCheckChildren = ({ children }) => {
  // le pasamos por parametros al children (en este caso el codeConfirmation)
  const { userComplete, user } = useAuth() //destructuring del usuario autorizado
  if (userComplete?.data?.user?.check == true || user?.check == true) {
    //si hay userComplete (a traves del register) o user (localStorage)
    return <Navigate to="/dashboard" /> //nos lleva a la dashboard
  }

  if (user == null && userComplete.data.confirmationCode === "") {
    //si no tiene usuario (localStorage) o no tiene el codeConfirmation
    return <Navigate to="/login" /> //nos lleva al login
  }
  return children //si no pasa por ninguno de los anteriores, retorna el children
}
