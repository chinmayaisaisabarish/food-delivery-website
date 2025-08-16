import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin, isLoggedIn, handleLogout, food_list }) => {
  const { addToCart } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // Handle search input change

  // Allow spaces in search, and don't trim
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filter the food list by name (case-insensitive)
    const results = food_list.filter((item) =>
      item.food_name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(results);
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      // If closing, also clear search
      if (prev) {
        setSearchTerm("");
        setFilteredItems([]);
      }
      return !prev;
    });
  };

  const getTotalCartAmount = () => {
    // Placeholder function for cart items; customize based on your logic
    return 0;
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mob-app")}
          className={menu === "mob-app" ? "active" : ""}
        >
          mobile app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="Search"
          onClick={toggleSearch}
          style={{ cursor: "pointer" }}
        />
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Basket" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>

      {isSearchOpen && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            autoFocus
          />
          <div className="search-results">
            {searchTerm ? (
              filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.food_id}
                    className="search-item"
                    onClick={() => {
                      addToCart(item.food_id);
                      setIsSearchOpen(false);
                      setSearchTerm("");
                      setFilteredItems([]);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={item.food_image} alt={item.food_name} />
                    <div>
                      <h4>{item.food_name}</h4>
                      <p>₹{item.food_price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items found</p>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
