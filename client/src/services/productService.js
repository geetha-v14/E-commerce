import api from "../api/api";

export const getProducts = async (params = {}) => {

  const query = new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {

      if (Array.isArray(value)) {

        value.forEach((item) =>
          query.append(key, item)
        );

      } else {

        query.append(key, value);

      }

    }
  );

  

  const response =
    await api.get(
      `/products?${query}`
    );

  return response.data.data;

};

export const getSingleProduct =
  async (slug) => {

    const response =
      await api.get(
        `/products/${slug}`
      );

    return response.data.data;

  };

export const getRelatedProducts =
  async (
    categoryId,
    productId
  ) => {

    const response =
      await api.get(
        `/products/related/${categoryId}/${productId}`
      );

    return response.data;

  };
