import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/login/Login";
import Signin from "./views/signin/Signin";
import HomePage from "./views/homePage/HomePage";
import Inventory from "./routes/Inventory";
import Customers from "./routes/Customers";
import Invoices from "./routes/Invoices";
import RequireAuth from "./components/auth/RequireAuth";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route element={<RequireAuth />}>
            <Route path="/inventory/*" element={<Inventory />}></Route>
            <Route path="/customers/*" element={<Customers />}></Route>
            <Route path="/invoices/*" element={<Invoices />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
