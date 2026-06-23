import { useQuery, useApolloClient } from "@apollo/client/react";
import { ME } from "../graphql/usuario.queries";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"))
  const [userIdentity, setUserIdentity] = useState(null)
  const client = useApolloClient();

  const { data, loading, error } = useQuery(ME, {
    skip: !token
  })

  useEffect(() => {
    if(data) {
      setUserIdentity(data.me)
    }
  }, [data])

  const guardarToken = async (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
    await client.resetStore();
  }

  const eliminarToken = async () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    await client.clearStore();
  }

  const setMaterias = (materias) => {
    setUserIdentity(prev => ({
      ...prev,
      materias
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        userIdentity,
        setMaterias,
        loading,
        error,
        guardarToken,
        eliminarToken,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};