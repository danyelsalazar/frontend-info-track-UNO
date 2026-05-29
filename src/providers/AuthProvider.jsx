import { useQuery } from "@apollo/client/react"
import { ME } from "../graphql/usuario.queries";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider = ({children}) => {
  const {data: {me: userIdentity = {}} = {}, loading, error} = useQuery(ME, {
    // Solo ejecuta la query si hay token
    skip: !localStorage.getItem('accessToken')
  })

  return (
    <AuthContext.Provider value={{userIdentity, loading, error}}>
      {children}
    </AuthContext.Provider>
  )
}