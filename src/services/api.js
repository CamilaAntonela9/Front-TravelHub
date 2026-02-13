import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  // Asegúrate de que esta IP sea la de tu PC y que el servidor esté corriendo
  baseURL: "http://10.41.1.225:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error obteniendo el token de AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;