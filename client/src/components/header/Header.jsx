import { Link } from "react-router-dom";
import { BiStore } from "react-icons/bi";
import "./Header.scss";

import useAuth from "../../hooks/useAuth";

const Header = () => {
  const {auth} = useAuth()
  return (
    <>
      <div className="bg-main navbar sticky-top p-0 vw-100">
        <div className="container d-flex align-items-center justify-content-between">

          <div className="logo-area d-flex align-items-center py-3">
            <Link to={'/home'}>
              <BiStore className="logo pe-sm-1 pe-md-2 pe-lg-3" />
            </Link>
            <p className="name-page m-0">TRANG THÔNG TIN QUẢN LÝ{}</p>
          </div>

          <div className="features">
            <ul className="list-unstyled d-flex m-0">
              <li>
                <Link to={'/inventory/products-list'} className="px-lg-3">Kho hàng</Link>
              </li>
              <li>
                <Link to={'/invoices/all-invoices'} className="px-lg-3">Hóa đơn</Link>
              </li>
              <li>
                <Link to={'/customers/all-customers'} className="px-lg-3">Khách hàng</Link>
              </li>
            </ul>
          </div>

          {!auth?.email && <div className="login">
            <Link to={'/login'}>Đăng nhập</Link>
          </div>
}
        </div>
      </div>
    </>
  );
};

export default Header;
