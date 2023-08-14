import axios from "axios";
const api = axios.create({
  baseURL : "https://backend-pied-phi.vercel.app",
  withCredentials : true
})

export const fetchProducts = (category) => async (dispatch) => {
  try {
    // const res = await axios.get(`http://localhost:8000/${category}`);
    const res = await api.get(`/${category}`);
    const Products = res.data;
    console.log("api call");
   
    dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: Products });
  } catch (error) {
    dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
  }
};

export const addToCart = (items) => ({
  type: "ADD_TO_CART",
  payload: items,
});
export const removeFromCart = (productId) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: productId,
  };
};
// actions.js
export const loadCartFromStorage = () => {
  return {
    type: "LOAD_CART_FROM_STORAGE",
  };
};
