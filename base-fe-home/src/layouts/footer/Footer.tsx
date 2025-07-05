import React from "react";
import logo from '../../static/imgs/logo_footer.jpg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Logo + Info */}
          <div className="col-md-3 mb-4">
            <img src={logo} alt="Dona Trust" height="50" className="mb-3" />
            <p>Copyright © 2025.<br />All rights reserved</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-light"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light"><i className="fab fa-dribbble"></i></a>
              <a href="#" className="text-light"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Company */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">About us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Pricing</a></li>
              <li><a href="#" className="text-light text-decoration-none">Testimonials</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Help center</a></li>
              <li><a href="#" className="text-light text-decoration-none">Terms of service</a></li>
              <li><a href="#" className="text-light text-decoration-none">Legal</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Status</a></li>
            </ul>
          </div>

          {/* Stay up to date */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Stay up to date</h6>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
              />
              <button className="btn btn-secondary" type="button">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
