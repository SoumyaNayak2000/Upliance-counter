import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ColorModeSwitcher } from "./ColorModeSwitcher.tsx";
import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ColorModeSwitcher />
        <App />
      </ChakraProvider>
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
