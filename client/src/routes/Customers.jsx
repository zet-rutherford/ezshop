import { Routes, Route } from "react-router-dom";
import GetAllCustomers from "../views/customers/GetAllCustomers";

const Customers = () => {
  return (
    <>
      <Routes>
        <Route path="/all-customers" element={<GetAllCustomers />}></Route>
      </Routes>
    </>
  );
};

export default Customers;
