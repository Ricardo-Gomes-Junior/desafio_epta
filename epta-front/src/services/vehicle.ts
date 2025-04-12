import { api } from "./api";

export const registerVehicle = async (data: {
  plate: string;
  name: string;
}) => {
  const response = await api.post("/registerVehicle", { ...data });
  return response.data;
};
