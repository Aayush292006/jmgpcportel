import axios from "axios";

const BASE_URL = "https://jmgpc-backend.onrender.com/api/blueprints";

export const saveBlueprint = (roomId, blueprint) =>
  axios.post(BASE_URL, { roomId, blueprint });

export const getBlueprints = () => axios.get(BASE_URL);

export const deleteBlueprint = (id) => axios.delete(`${BASE_URL}/${id}`);
console.log("Fetched blueprints:", response.data);
