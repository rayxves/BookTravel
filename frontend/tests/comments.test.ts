import { createComment } from "../api/comments";
import axios from "axios";

jest.mock("axios");
const mockedAxios = jest.mocked(axios, { shallow: false });

describe("createComment", () => {
  it("should call the API to create a comment", async () => {
    const content = "Test comment";
    const touristSpotName = "Test Spot";

    const request = { content, touristSpotName };
    mockedAxios.post.mockResolvedValueOnce({
      data: { content, touristSpotName },
    });

    await expect(createComment(content, touristSpotName)).resolves.toEqual(
      request
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/comment`,
      {
        data: {
          touristSpotName: touristSpotName,
          content: content,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  });
  it("should return an error message if the API call fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { message: { data: "API error" } },
    });

    await expect(createComment("Test comment", "Test Spot")).resolves.toEqual(
      "API error"
    );
  });

  it("should return a generic error message if no response is provided", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    await expect(createComment("Test comment", "Test Spot")).resolves.toEqual(
      "Error trying to create comment."
    );
  });
});
