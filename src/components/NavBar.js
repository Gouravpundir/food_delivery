import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useCart } from './ContextReducer';
import Modal from '../Model';
import Cart from '../screens/Cart.js';

export default function Navbar() {
  const navigate = useNavigate();
  const cartItems = useCart();
  const [cartView, setCartView] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('data');
    navigate('/login');
  };

  const handleCartClick = () => {
    setCartView(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">FoodieFinds</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("data") ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                </li>
              ) : ""}
            </ul>
            {(!localStorage.getItem("data")) ? (
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createUser">Signup</Link>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white text-success mx-1" onClick={handleCartClick} to="/myCart">
                  My Cart{' '}
                  {cartItems.length > 0 ? (
                    <Badge pill bg='danger'>{cartItems.length}</Badge>
                  ) : null}
                </Link>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
