import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/materia.css'
import './styles/dashboard.css'
import App from './pages/App.jsx'
import './styles/profesores.css'
import './styles/dashboard.css'
import './styles/reseña.css'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({uri: import.meta.env.VITE_GRAPHQL_URI}),
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
