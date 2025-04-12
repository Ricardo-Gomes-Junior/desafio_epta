import { api } from "./api";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterUserData) => {
  const response = await api.post("/registerUser", data);
  return response.data;
};
