import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import LoginPage from "./pages/Login/LoginPage";
import userData from "./configs/helpers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {userData() == null && <Route path="/login" element={<LoginPage />} />}
        <Route path="/" element={<MainLayout role={userData()?.role} />}>
          {routes}
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
