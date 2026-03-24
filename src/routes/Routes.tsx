import { Route, Routes } from "react-router-dom";
import { PartNumbersByProcessIndex } from "../pages/PartNumbersByProcess/PartNumbersByProcessIndex";
import { CycleTimes } from "../pages/CycleTimes/CycleTimes";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CycleTimes />} />
      <Route
        path="/numeros-de-parte-por-proceso"
        element={<PartNumbersByProcessIndex />}
      />
    </Routes>
  );
};
