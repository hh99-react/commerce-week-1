import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "./store/UserContext";
import { useEffect } from "react";
import { auth } from "./firebase";

export const queryClient = new QueryClient();

function App() {
  const init = async () => {
    await auth.authStateReady();
  };

  useEffect(() => {
    init();
  }, []);

  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
    console.error = function no_console() {};
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider>
        <Router />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
