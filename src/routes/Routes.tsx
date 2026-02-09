import { Route, Routes } from "react-router-dom";
import { PartNumbersByProcessIndex } from "../pages/PartNumbersByProcess/PartNumbersByProcessIndex";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PartNumbersByProcessIndex />} />
    </Routes>
  );
};
