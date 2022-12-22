import axiosClient  from "../api/axiosClient";

const getHome = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosClient({
                method: "GET",
                url: '/home'
            });
            resolve(response);
        } catch (e) {
            reject(3);
        }
    });
};

export { getHome };
