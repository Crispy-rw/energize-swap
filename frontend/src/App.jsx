import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import LoginPage from "./pages/Login/LoginPage";
import userData from "./configs/helpers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout role={userData()?.role} />}>
          {routes}
        </Route>
        <Route path="/unauthorized" element={<p>Unauthorized: 400! go to <a href={'/'}>Index</a> page </p>} />
        <Route path="*" element={<p>There's nothing here: 404! go to <a href={'/login'}>login</a> page</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
