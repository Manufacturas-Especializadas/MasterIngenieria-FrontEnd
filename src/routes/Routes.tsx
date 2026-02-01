import { Route, Routes } from "react-router-dom";
import { HomeIndex } from "../pages/Home/HomeIndex";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeIndex />} />
    </Routes>
  );
};
