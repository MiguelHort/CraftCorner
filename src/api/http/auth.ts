import axios from "axios";

type UserData = {
  email: string;
  senha: string;
};

type UserCadastro = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  message: string;
  redirectToChangePassword?: boolean;
};

export async function getUser(data: UserData): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>("/api/auth", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createUser(data: UserCadastro): Promise<AuthResponse> {
  try {
    const response = await axios.post<AuthResponse>("/api/cadastro", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
