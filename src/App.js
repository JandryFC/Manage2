import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* pages */
import NotFound from "./pages/NotFoundPage/NotFound";
import Login from "./pages/LoginPage/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import LibroPage from "./pages/LibroPage/LibroPage";
import ModulePage from "./pages/ModulePage/ModulePage";
/* router */

function App() {
  return (
    <div className="App h-screen">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/book/:book_number" element={<LibroPage />} />
          <Route exact path="/dashboard/book/:book_number/module/:module_number" element={<ModulePage />} />
            

          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
