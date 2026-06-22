import { useState, useEffect } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import categoryService from "../../../services/Admin/categoryService";

const EditCategory = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [mainCategories, setMainCategories] =
    useState([]);

  const [previewImage, setPreviewImage] =
    useState("");

  const [existingImage, setExistingImage] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      position: 0,
      parentCategory: "",
      image: null,
    });

  useEffect(() => {
    loadCategory();

    loadMainCategories();
  }, [id]);

  const loadCategory =
    async () => {
      try {
        const res =
          await categoryService.getCategoryById(
            id
          );

        const category =
          res.data;

        setFormData({
          name:
            category.name || "",
          description:
            category.description ||
            "",
          position:
            category.position || 0,
          parentCategory:
            category.parentCategory ||
            "",
          image: null,
        });

        setExistingImage(
          category.image?.url || ""
        );
      } catch (error) {
        console.log(error);
      }
    };

  const loadMainCategories =
    async () => {
      try {
        const res =
          await categoryService.getMainCategories();

        setMainCategories(
          res.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreviewImage(
      URL.createObjectURL(file)
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
          "name",
          formData.name
        );

        data.append(
          "description",
          formData.description
        );

        data.append(
          "position",
          formData.position
        );

        data.append(
          "parentCategory",
          formData.parentCategory
        );

        if (
          formData.image
        ) {
          data.append(
            "image",
            formData.image
          );
        }

        await categoryService.updateCategory(
          id,
          data
        );

        alert(
          "Category Updated Successfully"
        );

        navigate(
          "/admin/categories"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Update Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container-fluid">

      <div className="card shadow-sm">

        <div className="card-header">
          <h4>Edit Category</h4>
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
                  Category Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Position
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="position"
                  value={
                    formData.position
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="col-12 mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  rows="4"
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

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Parent Category
                </label>

                <select
                  className="form-select"
                  name="parentCategory"
                  value={
                    formData.parentCategory
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Main Category
                  </option>

                  {mainCategories.map(
                    (category) => (
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
                  Replace Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                />

              </div>

              {existingImage &&
                !previewImage && (

                <div className="col-12 mb-3">

                  <label className="form-label">
                    Current Image
                  </label>

                  <div>
                    <img
                      src={
                        existingImage
                      }
                      alt=""
                      width="150"
                      height="150"
                      className="border rounded"
                      style={{
                        objectFit:
                          "cover",
                      }}
                    />
                  </div>

                </div>

              )}

              {previewImage && (

                <div className="col-12 mb-3">

                  <label className="form-label">
                    New Image Preview
                  </label>

                  <div>
                    <img
                      src={
                        previewImage
                      }
                      alt=""
                      width="150"
                      height="150"
                      className="border rounded"
                      style={{
                        objectFit:
                          "cover",
                      }}
                    />
                  </div>

                </div>

              )}

            </div>

            <button
              type="submit"
              disabled={
                loading
              }
              className="btn btn-primary"
            >
              {loading
                ? "Updating..."
                : "Update Category"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditCategory;