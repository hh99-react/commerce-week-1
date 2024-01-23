import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "./store/UserContext";

export const queryClient = new QueryClient();

function App() {
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
