import React from "react";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "@nbfc/ui";
import { router } from "./router";
import { AppProviders } from "./providers";

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;

