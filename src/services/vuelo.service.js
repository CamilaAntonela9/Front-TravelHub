import api from "./api";

export const obtenerVuelos = async () => {
  const res = await api.get("/vuelos");
  return res.data;
};

export const crearVuelo = async (data) => {
  const res = await api.post("/vuelos", data);
  return res.data;
};

export const eliminarVuelo = async (id) => {
  const res = await api.delete(`/vuelos/${id}`);
  return res.data;
};