import api from "../../api/api";

const categoryService = {

  // MAIN CATEGORIES
  getMainCategories: async () => {
    const response = await api.get(
      "/categories/main"
    );

    return response.data;
  },


  // ALL CATEGORIES (ADMIN)
  getCategories: async ({
    page = 1,
    limit = 10,
    search = "",
  }) => {
    const response = await api.get(
      `/categories?page=${page}&limit=${limit}&search=${search}`
    );

    return response.data;
  },


  getCategoryById: async (id) => {
    const response = await api.get(
      `/categories/${id}`
    );

    return response.data;
  },

  // SINGLE CATEGORY
  getCategoryBySlug: async (
    slug
  ) => {
    const response = await api.get(
      `/categories/slug/${slug}`
    );

    return response.data;
  },

  // CREATE CATEGORY
  createCategory: async (
    formData
  ) => {
    const response = await api.post(
      "/categories",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  // UPDATE CATEGORY
  updateCategory: async (
    id,
    formData
  ) => {
    const response = await api.put(
      `/categories/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  // DELETE CATEGORY
  deleteCategory: async (
    id
  ) => {
    const response = await api.delete(
      `/categories/${id}`
    );

    return response.data;
  },

  // TOGGLE ACTIVE/INACTIVE
  toggleCategoryStatus:
    async (id) => {

      const response =
        await api.patch(
          `/categories/${id}/toggle`
        );

      return response.data;
    },

  // SUBCATEGORIES
  getSubcategories: async (
    parentId
  ) => {
    const response = await api.get(
      `/categories/subcategories/${parentId}`
    );

    return response.data;
  },

};

export default categoryService;