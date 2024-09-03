import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.8:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((response) => {
    return response.data.data;
  });

const getProductList = () =>
  axiosClient.get("/products?populate=*").then((response) => {
    return response.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((response) => {
      return response.data.data;
    });

const register = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/carts", data, {
    headers: {
      Authorization: "Bearer" + jwt,
    },
  });

const getCartItem = (userId, jwt) =>
  axiosClient
    .get("/carts?filters[userId][$eq]=" + userId + "&populate=*", {
      headers: {
        Authorization: "Bearer" + jwt,
      },
    })
    .then((response) => {
      return response.data.data;
    });
export default {
  getCategory,
  getCategoryList,
  getProductList,
  getProductsByCategory,
  register,
  signIn,
  addToCart,
  getCartItem,
};
