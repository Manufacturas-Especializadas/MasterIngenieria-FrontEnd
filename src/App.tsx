import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { MyRoutes } from "./routes/Routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-2">
        <MyRoutes />
      </main>
    </BrowserRouter>
  );
};
