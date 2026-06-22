import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct, } from "../../../features/Admin/productSlice";
import categoryService from "../../../services/Admin/categoryService";

const CreateProduct = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [categories, setCategories] =
        useState([]);

    const [subcategories, setSubcategories] =
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
            isPublished: false,
            images: [],
        });

    // Load Categories
    useEffect(() => {
        const fetchCategories =
            async () => {
                try {
                    const res =
                        await categoryService.getMainCategories();

                    setCategories(
                        res.data
                    );
                } catch (error) {
                    console.log(error);
                }
            };

        fetchCategories();
    }, []);

    // Load Subcategories
    useEffect(() => {
        if (!formData.category)
            return;

        const fetchSubcategories =
            async () => {
                try {
                    const res =
                        await categoryService.getSubcategories(
                            formData.category
                        );

                    setSubcategories(
                        res.data
                    );
                } catch (error) {
                    console.log(error);
                }
            };

        fetchSubcategories();
    }, [formData.category]);

    const handleChange = (e) => {
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

        if (files.length > 5) {

            alert(
                "Maximum 5 images allowed"
            );

            return;
        }

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

    //removeimage 
    const removeImage = (index) => {

        const updatedImages =
            [...formData.images];

        updatedImages.splice(
            index,
            1
        );

        const updatedPreviews =
            [...previewImages];

        updatedPreviews.splice(
            index,
            1
        );

        setFormData((prev) => ({
            ...prev,
            images: updatedImages,
        }));

        setPreviewImages(
            updatedPreviews
        );
    };




    const handleSubmit = async (e) => {
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

            formData.images.forEach(
                (image) => {
                    data.append(
                        "images",
                        image
                    );
                }
            );



            await dispatch(createProduct(data)).unwrap();

            alert(
                "Product Created Successfully"
            );

            navigate(
                "/admin/products"
            );
        } catch (error) {
            // console.log(error);
            alert(
                error.response?.data
                    ?.message ||
                "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">

            <div className="card shadow-sm">

                <div className="card-header">
                    <h4>
                        Create Product
                    </h4>
                </div>

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Product Title
                                </label>

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
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Brand
                                </label>

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

                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
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

                                <label className="form-label">
                                    Subcategory
                                </label>

                                <select
                                    className="form-select"
                                    name="subcategory"
                                    value={
                                        formData.subcategory
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
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
                                <label className="form-label">
                                    Price
                                </label>

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
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Sale Price
                                </label>

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
                                <label className="form-label">
                                    Stock
                                </label>

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
                                    required
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">
                                    Description
                                </label>

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
                                    required
                                />
                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Product Images
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    multiple
                                    accept="image/*"
                                    onChange={
                                        handleImageChange
                                    }
                                />

                            </div>

                            <div className="col-12 mb-3">

                                <div className="d-flex flex-wrap gap-2">

                                    {previewImages.map(
                                        (image, index) => (

                                            <div
                                                key={index}
                                                className="position-relative"
                                            >

                                                <img
                                                    src={image}
                                                    alt=""
                                                    width="120"
                                                    height="120"
                                                    className="border rounded"
                                                    style={{
                                                        objectFit: "cover",
                                                    }}
                                                />

                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        )
                                    )}
                                </div>

                            </div>

                            <div className="col-12 mb-3">
                                <div className="form-check">

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
                                        isPublished
                                    </label>

                                </div>
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


                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="btn btn-primary"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Product"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CreateProduct;