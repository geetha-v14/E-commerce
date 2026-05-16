import api from "../api/api";

export const getProducts =
  async (params = {}) => {

    const query =
      new URLSearchParams(params);

    const response =
      await api.get(
        `/products?${query}`
      );

    return response.data.data;

};