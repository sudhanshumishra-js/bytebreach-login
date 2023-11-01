import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import RouterConfig from "./routes/RouteConfig";
function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
