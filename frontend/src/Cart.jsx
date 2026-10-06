import React from "react";

function Cart({ cart, setCart, closeCart }) {

    const increaseQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart(
            cart
                .map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setCart(
            cart.filter((item) => item._id !== id)
        );
    };

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );

    return (
        <div className="cart-overlay">

            <div className="cart-panel">

                <div className="cart-header">

                    <h2>YOUR CART</h2>

                    <button onClick={closeCart}>
                        ✕
                    </button>

                </div>

                {cart.length === 0 ? (

                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                    </div>

                ) : (

                    <>
                        <div className="cart-items">

                            {cart.map((item) => (

                                <div
                                    className="cart-item"
                                    key={item._id}
                                >

                                    <div className="cart-item-image">

                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <span>
                                                {item.category}
                                            </span>
                                        )}

                                    </div>


                                    <div className="cart-item-info">

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p>
                                            ₹{item.price}
                                        </p>


                                        <div className="quantity">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        item._id
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(
                                                        item._id
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>


                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            removeItem(item._id)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}

                        </div>


                        <div className="cart-footer">

                            <div className="cart-total">

                                <span>
                                    TOTAL
                                </span>

                                <strong>
                                    ₹{total}
                                </strong>

                            </div>


                            <button className="checkout-button">
                                CHECKOUT
                            </button>

                        </div>

                    </>

                )}

            </div>

        </div>
    );
}

export default Cart;