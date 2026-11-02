import { BrowserRouter } from "react-router-dom";
import MainRouter from "../MainRouter.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}
