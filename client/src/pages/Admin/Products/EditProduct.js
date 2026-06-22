import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    getProducts,
    updateProduct,
} from "../../../features/Admin/productSlice";

import categoryService from "../../../services/Admin/categoryService";

const EditProduct = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { products } = useSelector(
        (state) => state.products
    );

    const [loading, setLoading] =
        useState(false);

    const [categories, setCategories] =
        useState([]);

    const [subcategories, setSubcategories] =
        useState([]);

    const [existingImages, setExistingImages] =
        useState([]);

    const [previewImages, setPreviewImages] =
        useState([]);

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            brand: "",
            category: "",
            subcategory: "",
            price: "",
            salePrice: "",
            stock: "",
            featured: false,
            isPublished: true,
            images: [],
        });

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        const loadCategories =
            async () => {
                try {
                    const res =
                        await categoryService.getMainCategories();

                    setCategories(res.data);
                } catch (error) {
                    console.log(error);
                }
            };

        loadCategories();
    }, []);

    useEffect(() => {
        const product =
            products.find(
                (item) => item._id === id
            );

        if (!product) return;

        console.log(product);

        setFormData({
            title: product.title || "",
            description:
                product.description || "",
            brand: product.brand || "",
            category:
                product.category?._id ||
                product.category ||
                "",

            subcategory:
                product.subcategory?._id ||
                product.subcategory ||
                "",
            price: product.price || "",
            salePrice:
                product.salePrice || "",
            stock: product.stock || "",
            featured:
                product.featured || false,
            isPublished:
                product.isPublished ?? true,
            images: [],
        });

        setExistingImages(
            product.images || []
        );

        const loadSubcategories =
            async () => {

                const categoryId =
                    product.category?._id ||
                    product.category;

                if (!categoryId) return;

                try {

                    const res =
                        await categoryService.getSubcategories(
                            categoryId
                        );

                    setSubcategories(
                        res.data
                    );

                } catch (error) {
                    console.log(error);
                }
            };

        loadSubcategories();
    }, [products, id]);

    const handleChange = async (
        e
    ) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        if (name === "category") {
            setFormData((prev) => ({
                ...prev,
                category: value,
                subcategory: "",
            }));

            try {
                const res =
                    await categoryService.getSubcategories(
                        value
                    );

                setSubcategories(
                    res.data
                );
            } catch (error) {
                console.log(error);
            }

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleImageChange = (
        e
    ) => {
        const files =
            Array.from(
                e.target.files
            );

        setFormData((prev) => ({
            ...prev,
            images: files,
        }));

        const previews =
            files.map((file) =>
                URL.createObjectURL(
                    file
                )
            );

        setPreviewImages(
            previews
        );
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();

            try {
                setLoading(true);

                const data =
                    new FormData();

                data.append(
                    "title",
                    formData.title
                );

                data.append(
                    "description",
                    formData.description
                );

                data.append(
                    "brand",
                    formData.brand
                );

                data.append(
                    "category",
                    formData.category
                );

                data.append(
                    "subcategory",
                    formData.subcategory
                );

                data.append(
                    "price",
                    formData.price
                );

                data.append(
                    "salePrice",
                    formData.salePrice
                );

                data.append(
                    "stock",
                    formData.stock
                );

                data.append(
                    "featured",
                    formData.featured
                );

                data.append(
                    "isPublished",
                    formData.isPublished
                );

                formData.images.forEach(
                    (image) => {
                        data.append(
                            "images",
                            image
                        );
                    }
                );

                await dispatch(
                    updateProduct({
                        id,
                        formData: data,
                    })
                ).unwrap();

                alert(
                    "Product Updated Successfully"
                );

                navigate(
                    "/admin/products"
                );
            } catch (error) {
               

                alert(
                  error ||
                    "Update failed"
                );
                
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="container-fluid">

            <div className="card shadow-sm">

                <div className="card-header">
                    <h4>Edit Product</h4>
                </div>

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Title</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Brand</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="brand"
                                    value={
                                        formData.brand
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Category</label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map(
                                        (
                                            category
                                        ) => (
                                            <option
                                                key={
                                                    category._id
                                                }
                                                value={
                                                    category._id
                                                }
                                            >
                                                {
                                                    category.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Subcategory</label>

                                <select
                                    className="form-select"
                                    name="subcategory"
                                    value={
                                        formData.subcategory
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >
                                    <option value="">
                                        Select Subcategory
                                    </option>

                                    {subcategories.map(
                                        (
                                            subcategory
                                        ) => (
                                            <option
                                                key={
                                                    subcategory._id
                                                }
                                                value={
                                                    subcategory._id
                                                }
                                            >
                                                {
                                                    subcategory.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Price</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={
                                        formData.price
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Sale Price</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="salePrice"
                                    value={
                                        formData.salePrice
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>Stock</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="stock"
                                    value={
                                        formData.stock
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label>Description</label>

                                <textarea
                                    rows="5"
                                    className="form-control"
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-12 mb-3">

                                <label>
                                    Existing Images
                                </label>

                                <div className="d-flex flex-wrap gap-2">

                                    {existingImages.map(
                                        (
                                            image,
                                            index
                                        ) => (
                                            <img
                                                key={
                                                    index
                                                }
                                                src={
                                                    image.url
                                                }
                                                alt=""
                                                width="120"
                                                height="120"
                                                className="border rounded"
                                            />
                                        )
                                    )}

                                </div>

                            </div>

                            <div className="col-12 mb-3">

                                <label>
                                    Upload New Images
                                </label>

                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    onChange={
                                        handleImageChange
                                    }
                                />

                            </div>

                            <div className="d-flex flex-wrap gap-2 mb-3">

                                {previewImages.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <img
                                            key={
                                                index
                                            }
                                            src={
                                                image
                                            }
                                            alt=""
                                            width="120"
                                            height="120"
                                            className="border rounded"
                                        />
                                    )
                                )}

                            </div>

                            <div className="col-12 mb-3">

                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="featured"
                                        checked={
                                            formData.featured
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <label className="form-check-label">
                                        Featured Product
                                    </label>
                                </div>

                                <div className="form-check mt-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="isPublished"
                                        checked={
                                            formData.isPublished
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <label className="form-check-label">
                                        Published
                                    </label>
                                </div>

                            </div>

                        </div>

                        <button
                            className="btn btn-primary"
                            disabled={
                                loading
                            }
                        >
                            {loading
                                ? "Updating..."
                                : "Update Product"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditProduct;