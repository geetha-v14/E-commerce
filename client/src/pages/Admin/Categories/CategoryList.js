import {
    useState, useEffect,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { Link } from "react-router-dom";

import { getCategories }
    from "../../../features/Admin/categorySlice";

import categoryService from "../../../services/Admin/categoryService";

const CategoryList = () => {

    const dispatch = useDispatch();

    const {
        categories,
        totalPages,
        loading,
        total,
        mainCategories,
        subcategories,
    } = useSelector(
        (state) => state.categories
    );

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");


    const refreshCategories = () => {
        dispatch(
            getCategories({
                page,
                limit: 10,
                search,
            })
        );
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this category?"
            );

        if (!confirmDelete) return;

        try {

            await categoryService.deleteCategory(
                id
            );

            refreshCategories();

            alert(
                "Category deleted successfully"
            );

        } catch (error) {



            alert(
                error.response?.data
                    ?.message ||
                "Delete failed"
            );

        }

    };

    const handleToggle =
        async (id) => {

            try {

                await categoryService.toggleCategoryStatus(id);

                refreshCategories();

            } catch (error) {

                console.log(error);

            }

        };
    useEffect(() => {
        dispatch(getCategories({
            page,
            limit: 10,
            search,
        }));
    }, [dispatch, page, search]);


    return (

        <div className="container-fluid">

            <div className="card shadow-sm">

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h4>
                        Categories
                    </h4>

                    <Link
                        to="/admin/categories/create"
                        className="btn btn-primary"
                    >
                        + Add Category
                    </Link>

                </div>

                <div className="card-body">

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) => {
                            setSearch(
                                e.target.value
                            );
                            setPage(1);
                        }

                        }
                    />


                    <div className="row mb-4">

                        <div className="col-md-4">

                            <div className="card">
                                <div className="card-body">
                                    <h5>Total Categories</h5>
                                    <h3>{total}</h3>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card">
                                <div className="card-body">
                                    <h5>Main Categories</h5>

                                    <h3>
                                        {mainCategories}
                                    </h3>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card">
                                <div className="card-body">
                                    <h5>Subcategories</h5>

                                    <h3>
                                        {
                                            subcategories
                                        }
                                    </h3>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-bordered">

                            <thead>

                                <tr>

                                    <th>
                                        Image
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Parent
                                    </th>
                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {!loading && categories.length === 0 ? (

                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No categories found.
                                        </td>
                                    </tr>

                                ) : (

                                    categories.map(
                                        (category) => (

                                            <tr
                                                key={
                                                    category._id
                                                }
                                            >

                                                <td>

                                                    <img
                                                        src={
                                                            category.image?.url
                                                        }
                                                        alt=""
                                                        width="60"
                                                        height="60"
                                                        className="rounded"
                                                    />

                                                </td>

                                                <td>
                                                    {category.name}
                                                </td>

                                                <td>
                                                    {category.parentCategory?.name ||
                                                        "-"}
                                                </td>
                                                <td>

                                                    {category.parentCategory ? (

                                                        <span className="badge bg-info">
                                                            Subcategory
                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-primary">
                                                            Main Category
                                                        </span>

                                                    )}

                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${category.isActive
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                            }`}
                                                    >
                                                        {category.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>

                                                </td>

                                                <td>

                                                    <Link
                                                        to={`/admin/categories/${category._id}`}
                                                        className="btn btn-warning btn-sm me-2"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-sm btn-danger me-2"
                                                        disabled={loading}
                                                        onClick={() =>
                                                            handleDelete(category._id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-secondary me-2"
                                                        disabled={loading}
                                                        onClick={() =>
                                                            handleToggle(
                                                                category._id
                                                            )
                                                        }
                                                    >
                                                        Toggle
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}

                    {totalPages > 1 && (
                        <div className="d-flex gap-2 mt-3">

                            {[
                                ...Array(
                                    totalPages
                                ),
                            ].map((_, index) => (

                                <button
                                    key={index}
                                    className={`btn ${page === index + 1
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() =>
                                        setPage(
                                            index + 1
                                        )
                                    }
                                >
                                    {index + 1}
                                </button>

                            ))}

                        </div>
                    )}

                </div>

            </div>

        </div>

    );
};

export default CategoryList;