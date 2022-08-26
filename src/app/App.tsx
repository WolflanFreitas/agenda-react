import { CalendarScreen } from "./CalendarScreen";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getToday } from "../dateFunctions";

function App() {
  const month = getToday().substring(0, 7);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/calendar/:month" element={<CalendarScreen />} />
          <Route path="/" element={<Navigate replace to={{ pathname: "/calendar/" + month }} />} />
          <Route path="*" element="Rota não existe!" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
