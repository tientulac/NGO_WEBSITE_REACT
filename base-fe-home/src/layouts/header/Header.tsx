import React from "react";
import './Header.css';
import logo from '../../static/imgs/logo.jpg';
import { Dropdown } from 'react-bootstrap';

const Header: React.FC = () => {
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
          <li className="nav-item">
            <a className="nav-link" href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/campaign">Campaign</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/introduce">Introduce</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact</a>
          </li>
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
