import React from "react";

function Navbar({ cart, openCart }) {

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <nav className="navbar">

            <div className="logo">
                VYRE<span></span>
            </div>

            <div className="nav-links">
                <a href="#home">HOME</a>
                <a href="#collection">COLLECTION</a>
                <a href="#about">ABOUT</a>
            </div>

            <button
                className="cart-button"
                onClick={openCart}
            >
                🛒 CART

                {cartCount > 0 && (
                    <span className="cart-count">
                        {cartCount}
                    </span>
                )}
            </button>

        </nav>
    );
}

export default Navbar;