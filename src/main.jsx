import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/dashboard.css'
import App from './pages/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { AuthProvider } from './providers/AuthProvider.jsx'

const httpLink = new HttpLink({uri: import.meta.env.VITE_GRAPHQL_URI})

const authLink = new SetContextLink(({headers}) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)
