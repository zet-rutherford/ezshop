import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Table from "react-bootstrap/Table";
import { IoIosAddCircle } from "react-icons/io";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import ModalPopup from "../../components/modals/ModalPopup";
import ShowHistory from "../../components/modals/ShowHistory";
import Toasts from "../../components/ToastsComponent";

import "./GetAllCustomers.scss";

const GetAllCustomers = () => {
  const [customersList, setCustomerList] = useState([]);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showUpdateCustomerModal, setShowUpdateCustomerModal] = useState(false);
  const [showToasts, setShowToasts] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [invoicesList, setInvoicesList] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addMsg, setAddMsg] = useState("");
  const [variant, setVariant] = useState("");
  const { auth } = useAuth();

  const handleCloseAddCustomerModal = () => setShowAddCustomerModal(false);
  const handleShowAddCustomerModal = () => {
    setShowAddCustomerModal(true);
  };

  const handleShowUpdateCustomerModal = (e, customer) => {
    e.preventDefault();
    setCustomerID(customer.id);
    setName(customer.name);
    setPhone(customer.phone);
    setShowUpdateCustomerModal(true);
  };

  const handleCloseUpdateProductModal = () => {
    setShowUpdateCustomerModal(false);
  };

  const handleShowHistory = (item) => {
    handleGetHistory(item?.id);
    setCustomerName(item?.name);
    setShowHistory(true);
  };
  const handleCloseHistory = () => setShowHistory(false);

  const handleToastsCreateCustomer = (res) => {
    if (res.data.status === "Success") {
      setAddMsg("Thêm khách hàng thành công");
      setVariant("Success");
    }
  };

  const handleToastsUpdateCustomer = (res) => {
    if (res.data.status === "Success") {
      setAddMsg("Sửa thông tin thành công");
      setVariant("Success");
    }
  };

  const handleGetCustomersList = async () => {
    try {
      axios
        .get("/customers", {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((res) => {
          console.log(res?.data.data.Customers);
          setCustomerList(res?.data.data.Customers);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/customers",
          {
            name: name,
            phone: phone,
          },
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          handleGetCustomersList();
          handleToastsCreateCustomer(res);
          setShowToasts(true);
        });
    } catch (err) {
      setAddMsg("Thêm thất bại");
      setVariant("Danger");
      setShowToasts(true);
      console.error(err);
    }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      axios
        .patch(
          `/customers/${customerID}`,
          {
            name: name,
            phone: phone,
          },
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          handleGetCustomersList();
          handleToastsUpdateCustomer(res);
          setShowToasts(true);
        });
    } catch (err) {
      setAddMsg("Sửa thông tin thất bại");
      setVariant("Danger");
      setShowToasts(true);
      console.error(err);
    }
  };

  const handleDeleteCustomer = async (e, ID) => {
    e.preventDefault();
    try {
      axios
        .delete(`/customers/${ID}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((res) => {
          console.log(res);
          handleGetCustomersList();
          if (res.data.status === "Success") {
            setAddMsg("Xóa thành công");
            setVariant("Success");
            setShowToasts(true);
          }
        });
    } catch (err) {
      console.error(err);
      setAddMsg("Xóa thất bại");
      setVariant("Danger");
      setShowToasts(true);
    }
  };

  const handleGetHistory = async (id) => {
    try {
      await axios
        .get(`/invoice/customer-invoice/${id}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((res) => {
          console.log(res);
          setInvoicesList(res.data.data.Invoices);
          console.log(customerName);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCustomersList();
  }, []);

  return (
    <>
      <Header />
      <Toasts
        states={[showToasts, setShowToasts]}
        msg={addMsg}
        variant={variant}
      />
      <div className="container-fluid py-3 bg-main min-vh-100">
        <div className="container p-2 rounded article">
          <ModalPopup
            show={showAddCustomerModal}
            handleClose={handleCloseAddCustomerModal}
            title={"Thêm khách hàng"}
            body={["Tên khách hàng", "Số điện thoại"]}
            tag={["input", "input"]}
            option={[[], []]}
            states={[
              [name, setName],
              [phone, setPhone],
            ]}
            fuctionOnclick={handleAddCustomer}
          />
          <ModalPopup
            show={showUpdateCustomerModal}
            handleClose={handleCloseUpdateProductModal}
            title={"Sửa thông tin khách hàng"}
            body={["Tên khách hàng", "Số điện thoại"]}
            tag={["input", "input"]}
            option={[[], []]}
            states={[
              [name, setName],
              [phone, setPhone],
            ]}
            fuctionOnclick={handleUpdateCustomer}
          />
          <ShowHistory
            show={showHistory}
            handleClose={handleCloseHistory}
            list={invoicesList}
            name={customerName}
          />
          <div className="customers-list-table d-flex flex-column align-items-center justify-content-between position-relative">
            <button
              type="button"
              className="btn position-absolute top-0 end-0 add-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              variant="primary"
              onClick={handleShowAddCustomerModal}
            >
              <IoIosAddCircle className="add-btn-icon" />
            </button>
            <h3>Danh sách khách hàng</h3>
            {customersList.length ? (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Điện thoại</th>
                    <th>Lịch sử mua hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {customersList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.id}</td>
                        <td>{item?.name}</td>
                        <td>{item?.phone}</td>
                        <td>
                          <button
                            className="p-0 m-0 see-history-btn"
                            onClick={() => handleShowHistory(item)}
                          >
                            Xem lịch sử
                          </button>
                        </td>
                        <td className="m-0 d-flex align-items-center justify-content-end">
                          <button
                            className="trash-btn btn btn-outline-primary me-2"
                            onClick={(e) => {
                              handleShowUpdateCustomerModal(e, item);
                            }}
                          >
                            <FaPen />
                          </button>
                          <button
                            className="trash-btn btn btn-outline-danger"
                            onClick={(e) => {
                              handleDeleteCustomer(e, item.id);
                            }}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <p>Chưa có customers</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAllCustomers;
