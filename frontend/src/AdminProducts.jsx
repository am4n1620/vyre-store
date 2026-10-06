import React, { useEffect, useState } from "react";

function AdminProducts() {

    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        stock: "",
        image: ""
    });

    // Load products
    const loadProducts = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/products"
            );

            const data = await response.json();

            setProducts(data);

        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handle form changes
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // Add product
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:3000/products",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        category: formData.category,
                        price: Number(formData.price),
                        description: formData.description,
                        stock: Number(formData.stock),
                        image: formData.image
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add product"
                );
            }

            alert("🔥 Product added successfully!");

            setFormData({
                name: "",
                category: "",
                price: "",
                description: "",
                stock: "",
                image: ""
            });

            // Refresh product list
            loadProducts();

        } catch (error) {

            console.error(error);

            alert("❌ Failed to add product");
        }
    };

    // Delete product
    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:3000/products/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete product"
                );
            }

            alert("🗑️ Product deleted!");

            loadProducts();

        } catch (error) {

            console.error(error);

            alert("❌ Failed to delete product");
        }
    };

    return (
        <div>

            <h1>Admin Products</h1>

            {/* ADD PRODUCT */}

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >

                    <option value="Thrifted Clothes">Thrifted Clothes</option>
<option value="Vintage">Vintage</option>
<option value="T-Shirts">T-Shirts</option>
<option value="Hoodies">Hoodies</option>
<option value="Jeans">Jeans</option>
<option value="Jackets">Jackets</option>
<option value="Caps">Caps</option>
<option value="Hats">Hats</option>
<option value="Sunglasses">Sunglasses</option>
<option value="Perfumes">Perfumes</option>
<option value="Printed Socks">Printed Socks</option>
<option value="Accessories">Accessories</option>

                </select>

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />

                <button type="submit">
                    ADD PRODUCT
                </button>

            </form>


            {/* PRODUCT LIST */}

            <h2>Product Inventory</h2>

            {products.length === 0 ? (

                <p>
                    No products found.
                </p>

            ) : (

                <div>

                    {products.map((product) => (

                        <div key={product._id}>

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                Category: {product.category}
                            </p>

                            <p>
                                Price: ₹{product.price}
                            </p>

                            <p>
                                Stock: {product.stock}
                            </p>

                            <button
                                onClick={() =>
                                    deleteProduct(product._id)
                                }
                            >
                                DELETE
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminProducts;