import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import ShowInvoiceDeTail from "./ShowInvoiceDetail";
import { useEffect, useState } from "react";

const ShowHistory = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState([]);

  const { auth } = useAuth();

  const show = props.show;
  const handleClose = props.handleClose;
  const list = props.list;
  const name = props.name;

  const handleShowDetail = (id) => {
    setShowDetail(true);
    handleGetDetail(id);
  };

  const handleCloseDetail = () => setShowDetail(false);

  const handleGetDetail = async (id) => {
    try {
      await axios
        .get(`/invoice/customer-invoice-detail/${id}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status == "Success") {
            setDetail(res.data.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ShowInvoiceDeTail
        show={showDetail}
        handleClose={handleCloseDetail}
        list={detail}
        name={name}
      />
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Hóa đơn của {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Tổng giá trị</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {list.length ? (
                list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.id}</td>
                      <td>{item?.total_price}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleShowDetail(item?.id)}
                        >
                          Xem chi tiết
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>Không có hóa đơn</p>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowHistory;
