import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero3D from "./Hero3D";
import Products from "./Products";
import Cart from "./Cart";
import FireBackground from "./FireBackground";
import About from "./About";
import AdminProducts from "./AdminProducts";

function App() {

    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    // ADMIN PAGE
    if (window.location.pathname === "/admin") {
        return <AdminProducts />;
    }

    return (
        
        <>
        <button
    onClick={() => {
        window.location.href = "/admin";
    }}
    style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 3000,
        padding: "12px 20px",
        borderRadius: "30px",
        border: "1px solid white",
        background: "black",
        color: "white",
        cursor: "pointer"
    }}
>
    ADMIN
</button>
            <FireBackground />

            <Navbar
                cart={cart}
                openCart={() => setCartOpen(true)}
            />

            <Hero3D />

            <Products
                cart={cart}
                setCart={setCart}
            />

            <About />

            {cartOpen && (
                <Cart
                    cart={cart}
                    setCart={setCart}
                    closeCart={() => setCartOpen(false)}
                />
            )}
        </>
    );
}

export default App;