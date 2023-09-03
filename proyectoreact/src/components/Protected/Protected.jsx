import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export const Protected = ({ children }) => {
  //le pasamos al children como parametro
  const { user } = useAuth()
  if (user == null || user?.check == false) {
    //si no tiene usuario (localStorage) o no hay codeConfirmation
    return <Navigate to="/login" /> // nos manda al login
  }

  return children // sino, devuelve el children
}
