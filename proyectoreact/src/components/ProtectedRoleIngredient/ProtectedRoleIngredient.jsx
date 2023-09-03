import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export const ProtectedRoleIngredient = ({ children }) => {
  // le pasamos por parametros al children (en este caso el codeConfirmation)
  const { user } = useAuth() //destructuring del usuario autorizado
  if (user?.role == "nutricionista" || user?.role == "admin") {
    return children
  } else {
    return <Navigate to="/dashboard" />
  }
  //si no pasa por ninguno de los anteriores, retorna el children
}
