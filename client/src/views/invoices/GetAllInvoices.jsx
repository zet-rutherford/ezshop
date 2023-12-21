import Header from "../../components/header/Header";
import { IoIosAddCircle } from "react-icons/io";
import CreateInvoiceModal from "../../components/modals/CreateInvoiceModal";

import "./styles/GetAllInvoices.scss";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const GetAllInvoices = () => {
  const { auth } = useAuth();
  const [invoicesList, setInvoicesList] = useState("");
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);

  const handleShowCreateInvoiceModal = () => {
    setShowCreateInvoiceModal(true);
  };

  const handleCloseCreateInvoiceModal = () => {
    setShowCreateInvoiceModal(false);
  };

  const handleGetInvoicesList = async () => {
    try {
      axios.get("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />

      <div className="container-fluid py-3 min-vh-100 vw-100 bg-main">
        <div className="container p-2 rounded article">
          <div className="invoices-list-table d-flex flex-column align-items-center justify-content-between position-relative">
            <h3 className="pb-3">Tạo hóa đơn cửa hàng</h3>
            <CreateInvoiceModal
              show={showCreateInvoiceModal}
              handleClose={handleCloseCreateInvoiceModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default GetAllInvoices;
