import { LoginRequest, RegisterRequest } from "../api/auth";
import axios from "axios";

interface CredentialsLogin {
  name: string;
  token: string;
}

interface CredentialsRegister {
  name: string;
  email: string;
  token: string;
}

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("auth API", () => {
  describe("login", () => {
    it("should call the API with the correct credentials", async () => {
      const credentials: CredentialsLogin = {
        name: "ray",
        token: "test123",
      };
      mockedAxios.post.mockResolvedValueOnce({ data: credentials });

      const response = await LoginRequest({
        name: "ray",
        password: "test",
      });

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/account/login`,
        {
          name: "ray",
          password: "test",
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
        LoginRequest({ name: "ray", password: "test" })
      ).rejects.toThrow("Failed to login");
    });
  });
  describe("register", () => {
    it("should call the API and return correct credentials", async () => {
      const credentials: CredentialsRegister = {
        name: "ray",
        email: "ray@example.com",
        token: "test123",
      };
      mockedAxios.post.mockResolvedValueOnce({ data: credentials });

      const response = await RegisterRequest({
        name: "ray",
        email: "ray@example.com",
        password: "test",
      });

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/account/register`,
        {
          name: "ray",
          email: "ray@example.com",
          password: "test",
        }
      );
      expect(response).toEqual(credentials);
    });
    it("should return an error if login failed", async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: {
            message: "Failed to register",
          },
        },
      });
      await expect(
        RegisterRequest({
          name: "ray",
          email: "ray@example.com",
          password: "test",
        })
      ).rejects.toThrow("Failed to register");
    });
  });
});
