import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MyRoutes } from "./routes/routes"

function App() {

  return (
    <AuthProvider>
      <Router>
        <MyRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
