import { loginRequest, registerRequest } from "../api/auth";
import axios from "axios";

interface CredentialsLogin {
  UserName: string;
  token: string;
}

interface CredentialsRegister {
  UserName: string;
  Email: string;
  token: string;
}

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("auth API", () => {
  describe("login", () => {
    it("should call the API with the correct credentials", async () => {
      const credentials: CredentialsLogin = {
        UserName: "ray",
        token: "test123",
      };
      mockedAxios.post.mockResolvedValueOnce({ data: credentials });

      const response = await loginRequest({
        name: "ray",
        password: "test",
      });

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/account/login`,
        {
          UserName: "ray",
          Password: "test",
        }
      );
      expect(response).toEqual(credentials);
    });
    it("should return an error if login failed", async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: {
            message: "Failed to login",
          },
        },
      });
      await expect(
        loginRequest({ name: "ray", password: "test" })
      ).rejects.toThrow("Failed to login");
    });
  });
  describe("register", () => {
    it("should call the API and return correct credentials", async () => {
      const credentials: CredentialsRegister = {
        UserName: "ray",
        Email: "ray@example.com",
        token: "test123",
      };
      mockedAxios.post.mockResolvedValueOnce({ data: credentials });

      const response = await registerRequest({
        name: "ray",
        email: "ray@example.com",
        password: "test",
      });

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/account/register`,
        {
          UserName: "ray",
          Email: "ray@example.com",
          Password: "test",
        }
      );
      expect(response).toEqual(credentials);
    });
    it("should return an error if register failed", async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: {
            message: "Failed to register",
          },
        },
      });
      await expect(
        registerRequest({
          name: "ray",
          email: "ray@example.com",
          password: "test",
        })
      ).rejects.toThrow("Failed to register");
    });
  });
});
