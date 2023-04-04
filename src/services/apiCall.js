import axios from "axios";

const baseUrl = "http://localhost:3002";

const ProductApi = axios.create({
  baseURL: baseUrl,
});

export default ProductApi;
