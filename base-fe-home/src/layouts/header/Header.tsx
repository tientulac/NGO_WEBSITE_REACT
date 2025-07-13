import React, { useEffect, useState } from "react";
import './Header.css';
import logo from '../../static/imgs/logo.jpg';
import { Dropdown } from 'react-bootstrap';
import { Category } from "../../entities/category.entity";
import { BaseService } from "../../services/base.service";
import { toast } from 'react-toastify';

const Header: React.FC = () => {

  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await BaseService.getList<Category[]>("/category/list");
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data);
          setLoading(false);
        } else {
          toast.warning(response.message);
          setLoading(false);
        }
      } catch (err) {
        toast.warning("Internal server error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, []);


  return (
    <header className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="DONA TRUST" height="40" className="me-3" />
          {/* Search bar */}
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search campaign..."
            />
            <button className="btn btn-outline-secondary" type="button">
              🔍
            </button>
          </div>
        </div>

        {/* Menu items */}
        <ul className="navbar-nav flex-row gap-4 align-items-center mb-0">
          {data.map((item) => (
            <li className="nav-item" key={item.url}>
              <a className="nav-link" href={item.url}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3">
          {/* Language dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
              EN
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>EN</Dropdown.Item>
              <Dropdown.Item>VN</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/32"
            alt="avatar"
            className="rounded-circle"
            width="32"
            height="32"
          />

          {/* Logout icon */}
          <button className="btn btn-outline-danger border-0">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
