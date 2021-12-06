import * as React from "react"
import Navigator from "./src/components/Navigator";
import {AuthProvider} from "./src/contexts/AuthContext";

export default function App() {

  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}


