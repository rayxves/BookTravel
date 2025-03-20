import { createComment } from "../api/comments";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios, { shallow: false });

describe("createComment", () => {
  it("should call the API to create a comment", async () => {
    const content = "Test comment";
    const touristSpotName = "Test Spot";

    const request = { touristSpotName, content };
    mockedAxios.post.mockResolvedValueOnce({
      data: { touristSpotName, content },
    });

    await expect(createComment(content, touristSpotName)).resolves.toEqual(
      request
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/comment`,
      { content: "Test comment", touristSpotName: "Test Spot" },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
  });
  it("should return the error message if the API call fails", async () => {
    const errorMessage = "API error";
    mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    await expect(createComment("Test comment", "Test Spot")).rejects.toThrow(
      errorMessage
    );
  });

  
  it("should return a generic error message if no response is provided", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error());

    await expect(createComment("Test comment", "Test Spot")).rejects.toThrow(
      "Error trying to create comment."
    );
  });
});
