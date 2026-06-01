import { useQuery } from "@apollo/client/react"
import { ME } from "../graphql/usuario.queries";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const {data: {me: userIdentity = {}} = {}, loading, error} = useQuery(ME, {
    // Solo ejecuta la query si hay token
    skip: !token
  })

  const guardarToken = (newToken) => {
    localStorage.setItem('accessToken', newToken)
    setToken(newToken)
  }

  const eliminarToken = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{userIdentity, loading, error, guardarToken, eliminarToken, token}}>
      {children}
    </AuthContext.Provider>
  )
}