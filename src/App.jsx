import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { MyRoutes } from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <MyRoutes />
    </AuthProvider>
  );
}

export default App;
