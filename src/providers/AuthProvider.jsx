import { useQuery, useApolloClient } from "@apollo/client/react";
import { ME } from "../graphql/usuario.queries";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const client = useApolloClient();

  const { data, loading, error } = useQuery(ME, {
    skip: !token,
  });

  const userIdentity = data?.me ?? null;

  const guardarToken = async (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
    await client.resetStore();
  };

  const eliminarToken = async () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    await client.clearStore();
  };

  return (
    <AuthContext.Provider
      value={{
        userIdentity,
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