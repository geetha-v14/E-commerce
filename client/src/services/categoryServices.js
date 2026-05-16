import api from "../api/api";

export const getMainCategories  = async () => {

  const response =  await api.get(
      "/categories/main"
    );

  return response.data.data;
};

export const getCategoryBySlug =
  async (slug) => {

    const response =  await api.get(
        `/categories/slug/${slug}`
      );

    return response.data.data;

};

export const getSubcategories = async (parentId) => {

    const response = await api.get(
        `categories/subcategories/${parentId}`
      );

    return response.data.data;

};