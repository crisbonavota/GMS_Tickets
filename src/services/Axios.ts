import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://localhost:44326/api",
});

export default clienteAxios;
