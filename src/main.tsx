import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
      // onReset콜백은 ErrorFallback 컴포넌트의 resetErrorBoundary parameter로 받는다
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
