import api from "../api/api";

export const getHomepageProducts  = async () => {

  const response =  await api.get(
      "/products/homepage"
    );

  return response.data.data;
};