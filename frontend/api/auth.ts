import axios from "axios";

interface LoginData {
  name: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const loginRequest = async (credentials: LoginData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/account/login`,
      {
        UserName: credentials.name,
        Password: credentials.password,
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error("User not found");
      } else if (status === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error(error.message || "Failed to login");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const registerRequest = async (credentials: RegisterData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/account/register`,
      {
        UserName: credentials.name,
        Email: credentials.email,
        Password: credentials.password,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        throw new Error("Invalid registration data");
      } else if (status === 500) {
        throw new Error("Server error during registration");
      } else if (status == 401) {
        throw new Error("Username already in use.");
      } else {
        throw new Error(error.message || "Failed to register");
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
