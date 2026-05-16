import api from "../api/api";


export const getBanners = async () => {
  const response = await api.get(
    "/banners"
  );

  return response.data.data;
};