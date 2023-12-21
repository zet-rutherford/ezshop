import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const ShowInvoiceDeTail = (props) => {
  const { auth } = useAuth();
  const show = props.show;
  const handleClose = props.handleClose;
  const list = props.list;
  const [productsList, setProductsList] = useState([]);

  const handleGetPD = async () => {
    await axios
      .get(`/products`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        setProductsList(res.data.data.Products);
      });
  };

  useEffect(() => {
    handleGetPD();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} scrollable={true} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>SP</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {list?.product_list?.length ? (
                list?.product_list?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {productsList.length &&
                          productsList.find(({ id }) => id == item?.product_id)
                            ?.name}
                      </td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
                    </tr>
                  );
                })
              ) : (
                <p>Không có thông tin</p>
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

export default ShowInvoiceDeTail;
