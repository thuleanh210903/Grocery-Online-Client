import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.28:1337/api",
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
    .get(
      "/carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer" + jwt,
        },
      }
    )
    .then((response) => {
      const data = response.data.data;
      const cartItemList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images?.data[0]
            .attributes.url,
        id: item.id,
        products: item.attributes.products?.data[0].id
      }));

      return cartItemList;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete("/carts/" + id, {
    headers: {
      Authorization: "Bearer" + jwt,
    },
  });


const createOrder = (data,jwt) => axiosClient.post('/orders',data, {
  headers: {
    Authorization: "Bearer" + jwt,
  },
})
export default {
  getCategory,
  getCategoryList,
  getProductList,
  getProductsByCategory,
  register,
  signIn,
  addToCart,
  getCartItem,
  deleteCartItem,
  createOrder
};
