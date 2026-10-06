import React, { useEffect, useState } from "react";

function Products({ cart, setCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState({});
    const [scrollY, setScrollY] = useState(0);
    const [addedProduct, setAddedProduct] = useState(null);

    /* =========================================
       LOAD PRODUCTS
    ========================================= */

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load products");
                }

                return response.json();
            })
            .then((data) => {
                console.log("Products loaded:", data);

                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading products:", error);
                setLoading(false);
            });
    }, []);


    /* =========================================
       SCROLL EFFECT
    ========================================= */

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    /* =========================================
       CARD REVEAL
    ========================================= */

    useEffect(() => {
        if (products.length === 0) {
            return;
        }

        const cards = document.querySelectorAll(".product-card");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.dataset.id;

                        setVisibleCards((previous) => ({
                            ...previous,
                            [id]: true
                        }));
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        cards.forEach((card) => {
            observer.observe(card);
        });

        return () => {
            observer.disconnect();
        };
    }, [products]);


    /* =========================================
       ADD TO CART
    ========================================= */

    const addToCart = (product) => {

    setCart((previousCart) => {

        const existingItem = previousCart.find(
            (item) => item._id === product._id
        );

        if (existingItem) {
            return previousCart.map((item) =>
                item._id === product._id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );
        }

        return [
            ...previousCart,
            {
                ...product,
                quantity: 1
            }
        ];
    });

    setAddedProduct(product._id);

    setTimeout(() => {
        setAddedProduct(null);
    }, 1000);
};


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {
        return (
            <div className="loading">
                Loading collection...
            </div>
        );
    }


    /* =========================================
       PRODUCTS
    ========================================= */

    return (
        <section
            className="products-section"
            id="collection"
        >

            <div className="section-heading">

                <p>THE COLLECTION</p>

                <h2>
                    SHOP OUR <span>STYLE.</span>
                </h2>

            </div>


            {products.length === 0 ? (

                <p className="empty">
                    No products available yet.
                </p>

            ) : (

                <div
                    className="product-grid"
                    style={{
                        transform:
                            `translateY(${scrollY * -0.03}px)`
                    }}
                >

                    {products.map((product) => (

                        <div
                            className={`product-card ${
                                visibleCards[product._id]
                                    ? "product-visible"
                                    : "product-visible"
                            }`}

                            key={product._id}

                            data-id={product._id}

                            onMouseMove={(e) => {

                                const card =
                                    e.currentTarget;

                                const rect =
                                    card.getBoundingClientRect();

                                const x =
                                    e.clientX - rect.left;

                                const y =
                                    e.clientY - rect.top;

                                const centerX =
                                    rect.width / 2;

                                const centerY =
                                    rect.height / 2;

                                const rotateX =
                                    ((y - centerY) /
                                        centerY) * -8;

                                const rotateY =
                                    ((x - centerX) /
                                        centerX) * 8;

                                card.style.transform =
                                    `perspective(1000px)
                                    rotateX(${rotateX}deg)
                                    rotateY(${rotateY}deg)
                                    scale(1.06)`;

                                card.style.setProperty(
                                    "--mouse-x",
                                    `${x}px`
                                );

                                card.style.setProperty(
                                    "--mouse-y",
                                    `${y}px`
                                );
                            }}

                            onMouseLeave={(e) => {

                                e.currentTarget.style.transform =
                                    "perspective(1000px) " +
                                    "rotateX(0deg) " +
                                    "rotateY(0deg) " +
                                    "scale(1)";
                            }}
                        >

                            <div className="card-glow"></div>


                            {/* PRODUCT IMAGE */}

                            <div className="product-image">

                                <div className="product-image-inner">

                                    {product.image ? (

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />

                                    ) : (

                                        <div className="no-image">
                                            {product.category}
                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* PRODUCT INFO */}

                            <div className="product-info">

                                <p className="category">
                                    {product.category}
                                </p>

                                <h3>
                                    {product.name}
                                </h3>

                                <p className="description">
                                    {product.description}
                                </p>


                                <div className="product-bottom">

                                    <strong>
                                        ₹{product.price}
                                    </strong>


                                    <button
    className={
        addedProduct === product._id
            ? "added-button"
            : ""
    }
    onClick={() => addToCart(product)}
>
    {addedProduct === product._id
        ? "✓ ADDED"
        : "ADD +"}
</button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
}

export default Products;