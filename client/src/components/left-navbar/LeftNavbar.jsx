import { Link } from "react-router-dom";

const LeftNavbar = (props) => {
  return (
    <>
      {props.stock && (
        <nav className="col-lg-2 d-flex flex-column">
          <Link to={'/inventory/products-list'}>Danh sách kho</Link>
          <Link to={'/inventory/add-product'}>Thêm hàng</Link>
        </nav>
      )}
    </>
  );
};

export default LeftNavbar;
