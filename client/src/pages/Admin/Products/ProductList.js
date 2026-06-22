import { useEffect, useState } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    getProducts, deleteProduct,
} from "../../../features/Admin/productSlice";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";


const ProductList = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const {
        products,
        loading,
        total,
        totalPages,
        currentPage,
    } = useSelector(
        (state) =>
            state.products
    );

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmDelete) return;

        try {

            await dispatch(
                deleteProduct(id)
            ).unwrap();

            alert(
                "Product deleted successfully"
            );

        } catch (error) {

            alert(
                error || "Delete failed"
            );

        }

    };

    useEffect(() => {
        const timer =
            setTimeout(() => {
                dispatch(
                    getProducts({
                        page,
                        limit: 8,
                        search,
                    })
                );
            }, 500);

        return () =>
            clearTimeout(timer);
    }, [search, page, dispatch]);

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3>
                    Products
                </h3>

                <small className="text-muted">
                    Total Products : {total}
                </small>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/admin/products/create")}
                >
                    + Add Product
                </button>

            </div>

            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                </div>

            </div>

            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <div className="table-responsive">

                    <table className="table align-middle table-hover">

                        <thead className="table-light">
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {products.map((product) => (

                                <tr key={product._id}>

                                    <td>

                                        <img
                                            src={product.images?.[0]?.url}
                                            alt={product.title}
                                            width="60"
                                            height="60"
                                            className="rounded border"
                                            style={{
                                                objectFit: "cover"
                                            }}
                                        />

                                    </td>

                                    <td>

                                        <div className="fw-semibold">
                                            {product.title}
                                        </div>

                                        <small className="text-muted">
                                            {product.brand}
                                        </small>

                                    </td>

                                    <td>
                                        {product.category?.name}
                                    </td>

                                    <td>

                                        <div>
                                            ₹{product.salePrice}
                                        </div>

                                        <small className="text-decoration-line-through text-muted">
                                            ₹{product.price}
                                        </small>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${product.stock > 0
                                                ? "bg-success"
                                                : "bg-danger"
                                                }`}
                                        >
                                            {product.stock}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${product.isPublished
                                                ? "bg-success"
                                                : "bg-secondary"
                                                }`}
                                        >
                                            {product.isPublished
                                                ? "Published"
                                                : "Draft"}
                                        </span>

                                    </td>

                                    <td>


                                        <Link
                                            to={`/admin/products/${product._id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>


                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

            <div className="d-flex justify-content-center mt-4">

                <button
                    className="btn btn-outline-primary me-2"
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                >
                    <MdOutlineArrowBackIos />

                </button>

                <span className="align-self-center">

                    Page {currentPage} of {totalPages}

                </span>

                <button
                    className="btn btn-outline-primary ms-2"
                    disabled={
                        page === totalPages
                    }
                    onClick={() =>
                        setPage(page + 1)
                    }
                >
                    <MdOutlineArrowForwardIos />

                </button>

            </div>

        </div>
    );
};

export default ProductList;