import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ModalPopup from "../../components/modals/ModalPopup";
import Toasts from "../../components/ToastsComponent";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import "./styles/GetProductsList.scss";
import { IoReloadOutline } from "react-icons/io5";

const GetProductsList = () => {
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const { auth } = useAuth();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [showToasts, setShowToasts] = useState(false);

  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [addMsg, setAddMsg] = useState("");
  const [variant, setVariant] = useState("");

  const handleCloseAddProductModal = () => setShowAddProductModal(false);
  const handleShowAddProductModal = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setShowAddProductModal(true);
  };

  const handleShowUpdateProductModal = (e, product) => {
    e.preventDefault();
    setProductID(product.id);
    setName(product.name);
    setCategory(
      categoriesList.find(({ id }) => id == product.category_id).name
    );
    setPrice(product.price);
    setQuantity(product.quantity);
    setShowUpdateProductModal(true);
  };

  const handleCloseUpdateProductModal = () => {
    setShowUpdateProductModal(false);
  };

  const handleGetAllCategories = async () => {
    try {
      await axios
        .get("/products/categories", {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        })
        .then((res) => {
          setCategoriesList(res?.data.data);
          setCategory(res?.data.data[0].name);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const GetAllProducts = async () => {
    try {
      const response = await axios
        .get("/products", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          setProductsList(res?.data.data.Products);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      axios
        .delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          GetAllProducts();
        });
    } catch (err) {}
  };

  const handleToasts = (res) => {
    if (res.data.status === "Success") {
      setAddMsg("Đăng sản phầm thành công");
      setVariant("Success");
    }
  };

  const handleToastsUpdateProduct = (res) => {
    if (res.data.status === "Success") {
      setAddMsg("Thay đổi sản phẩm thành công");
      setVariant("Success");
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post(
          "/products",
          {
            name: name,
            price: price,
            categoryId: categoriesList.find(({ name }) => name == category).id,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((res) => {
          handleToasts(res);
          setShowToasts(true);
          GetAllProducts();
          setName("");
          setPrice("");
          setQuantity("");
        });
    } catch (err) {
      setAddMsg("Đăng sản phầm thất bại");
      setVariant("Danger");
      setShowToasts(true);
      console.error(err);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(
          `/products/${productID}`,
          {
            name: name,
            price: price,
            categoryId: categoriesList.find(({ name }) => name == category).id,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          handleToastsUpdateProduct(res);
          setShowToasts(true);
          GetAllProducts();
        });
    } catch (err) {
      console.error(err);
      setAddMsg("Thay đổi thất bại");
      setVariant("Danger");
      setShowToasts(true);
    }
  };

  useEffect(() => {
    GetAllProducts();
  }, []);

  useEffect(() => {
    handleGetAllCategories();
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
            show={showUpdateProductModal}
            handleClose={handleCloseUpdateProductModal}
            title={"Sửa thông tin sản phẩm"}
            body={["Tên sản phẩm", "Danh mục", "Số lượng", "Giá"]}
            tag={["input", "select", "input", "input"]}
            option={[[], categoriesList, [], []]}
            states={[
              [name, setName],
              [category, setCategory],
              [quantity, setQuantity],
              [price, setPrice],
            ]}
            fuctionOnclick={handleUpdateProduct}
          />
          <ModalPopup
            show={showAddProductModal}
            handleClose={handleCloseAddProductModal}
            title={"Thêm hàng"}
            body={["Tên sản phẩm", "Danh mục", "Số lượng", "Giá"]}
            tag={["input", "select", "input", "input"]}
            option={[[], categoriesList, [], []]}
            states={[
              [name, setName],
              [category, setCategory],
              [quantity, setQuantity],
              [price, setPrice],
            ]}
            fuctionOnclick={handleAddProduct}
          />
          <div className="products-list-main d-flex flex-column align-items-center justify-content-between position-relative">
            <button
              type="button"
              className="btn position-absolute top-0 end-0 add-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              variant="primary"
              onClick={handleShowAddProductModal}
            >
              <IoIosAddCircle className="add-btn-icon" />
            </button>

            <h3>Danh sách hàng tồn kho</h3>
            {productsList.length ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item?.id}</th>
                        <td>{item?.name}</td>
                        <td>
                          {
                            categoriesList.find(
                              ({ id }) => id == item.category_id
                            )?.name
                          }
                        </td>
                        <td>{item?.price}</td>
                        <td>{item?.quantity}</td>
                        <td className="m-0 d-flex align-items-center justify-content-end">
                          <button
                            className="trash-btn btn btn-outline-primary me-2"
                            onClick={(e) => {
                              handleShowUpdateProductModal(e, item);
                            }}
                          >
                            <FaPen />
                          </button>

                          <button
                            className="trash-btn btn btn-outline-danger"
                            onClick={() => {
                              handleDeleteProduct(item.id);
                            }}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Kho rỗng</p>
            )}
            <div className="products-feature"></div>
            <button
              className="btn btn-success"
              onClick={() => {
                GetAllProducts();
              }}
            >
              Làm mới <IoReloadOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetProductsList;
