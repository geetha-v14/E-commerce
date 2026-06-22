import api from "../../api/api";

const userService = {

    getUsers: async (
        page = 1,
        limit = 10,
        search = ""
    ) => {

        const response = await api.get(
            `/users/admin/all?page=${page}&limit=${limit}&search=${search}`
        );

        return response.data;
    },

    changeUserRole: async (
        userId,
        role
    ) => {

        const response = await api.patch(
            `/users/admin/${userId}/role`,
            { role }
        );

        return response.data;
    },

    toggleUserBlock: async (
        userId
    ) => {

        const response = await api.patch(
            `/users/admin/${userId}/block`
        );

        return response.data;
    },

    getUserDetails: async (id) => {

    const response =
        await api.get(
            `/users/admin/${id}`
        );

    return response.data;

},

};

export default userService;