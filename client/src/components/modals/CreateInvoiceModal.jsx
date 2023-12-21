import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Toasts from "../ToastsComponent";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import "./CreateInvoiceModal.scss";
import { IoCloseCircleOutline } from "react-icons/io5";

const CreateInvoiceModal = (props) => {
  const { auth } = useAuth();
  const [itemsList, setItemsList] = useState([]);
  const [billList, setBillList] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [itemID, setItemID] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [activeCheck, setActiveCheck] = useState(true);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showToasts, setShowToasts] = useState(false);
  const [variant, setVariant] = useState("");
  const [addMsg, setAddMsg] = useState("");
  const [active, setActive] = useState(false);

  const handleShowToasts = (v, msg) => {
    setShowToasts(true);
    setVariant(v);
    setAddMsg(msg);
  };

  const handleCheckAccount = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/customers/check-customer",
          {
            phone: customerPhone,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res?.data?.status == "Success") {
            setShowCustomer(true);
            setCustomerName(res.data.data.Customers[0].name);
            setCustomerID(res.data.data.Customers[0].user_customer.customer_id);
            setActive(true);
          } else {
            handleShowToasts("Danger", "Khách hàng chưa tồn tại");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckItems = async (e) => {
    e.preventDefault();
    try {
      await axios
        .get(`http://localhost:3000/products/${itemID}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((res) => {
          console.log(res);
          if ((res.data.status = "Success") && itemID) {
            const price = res.data.data.Products[0].price;
            const name = res.data.data.Products[0].name;
            const quantity = res.data.data.Products[0].quantity;
            if (quantity < itemQuantity) {
              handleShowToasts("Danger", "Không đủ số lượng hàng trong kho");
            } else {
              setItemsList((prev) => [
                ...prev,
                {
                  product_id: itemID,
                  quantity: itemQuantity,
                },
              ]);

              setBillList((prev) => [
                ...prev,
                {
                  productname: name,
                  quantity: itemQuantity,
                  price: price,
                },
              ]);
            }
          } else {
            handleShowToasts("Danger", "Không tìm thấy mặt hàng");
          }
          console.log(itemsList);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleActive = (e) => {
    e.preventDefault();
    setActive(false);
    setCustomerName("");
    setCustomerPhone("");
    setShowCustomer(false);
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/invoice",
          {
            customer_id: customerID,
            product_list: itemsList,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (
            res.data.status == "Success" &&
            res.data.message == "Invoice created successfully"
          ) {
            handleShowToasts("Success", "Tạo hóa đơn thành công");
            setBillList([]);
            setItemsList([]);
          } else {
            handleShowToasts("Danger", "Tạo hóa đơn thất bại");
            setBillList([]);
            setItemsList([]);
          }
        });
    } catch (error) {
      handleShowToasts("Danger", "Tạo hóa đơn thất bại");
    }
  };

  const handleClearBill = (e) => {
    e.preventDefault();
    setBillList([]);
    setItemsList([]);
  };
  return (
    <>
      <Toasts
        states={[showToasts, setShowToasts]}
        msg={addMsg}
        variant={variant}
      />

      <Container>
        <Row>
          <Col lg={7}>
            <div class="d-flex flex-column">
              <h5 className="mb-3">Tạo hóa đơn</h5>
              <div className="mb-4">
                <h6>Thông tin khách hàng</h6>
                <form onSubmit={handleCheckAccount}>
                  <title>Số điện thoại</title>

                  <input
                    className="me-2"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                    }}
                    disabled={active}
                  />
                  <button className="cus-btn" type="submit" disabled={active}>
                    Kiểm tra
                  </button>
                  {showCustomer && (
                    <div className="">
                      <p className="m-0 text-danger">
                        {customerName} - {customerPhone}{" "}
                        <button
                          className="x-cus-btn"
                          onClick={(e) => {
                            handleActive(e);
                          }}
                        >
                          <IoCloseCircleOutline className="x-cus-btn" />
                        </button>
                      </p>
                    </div>
                  )}
                </form>
              </div>
              <div>
                <h6>Chọn sản phẩm</h6>
                <form action="" onSubmit={handleCheckItems}>
                  <title>ID sản phẩm</title>
                  <input
                    type="text"
                    value={itemID}
                    onChange={(e) => {
                      setItemID(e.target.value);
                    }}
                    className="me-2"
                  />
                  <title>Số lượng</title>
                  <input
                    type="text"
                    value={itemQuantity}
                    onChange={(e) => {
                      setItemQuantity(e.target.value);
                    }}
                    className="me-2"
                  />
                  <button className="cus-btn" type="submit">
                    Thêm
                  </button>
                </form>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div class="d-flex flex-column">
              <h5>Thông tin hóa đơn</h5>
              <button onClick={(e) => handleClearBill(e)} className="cus-btn">
                Clear
              </button>
              {billList.length ? (
                <div>
                  {billList.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="d-flex justify-content-between">
                          <p className="m-0">{item?.productname}</p>
                          <p className="m-0">{item?.price * item?.quantity}</p>
                        </div>

                        <p className="m-0">x{item?.quantity}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>Chưa có mặt hàng nào</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="d-flex justify-content-end">
        <Button onClick={(e) => handleCreateInvoice(e)} disabled={!active}>
          Tạo
        </Button>
      </div>
    </>
  );
};

export default CreateInvoiceModal;
