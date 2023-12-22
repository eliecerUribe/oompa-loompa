import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Details from "../views/Details";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Details />} />
    </Routes>
  );
}
