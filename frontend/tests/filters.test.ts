import { filterByName } from "../api/filters";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get filtered TouristSpots from API", () => {
    it("should return a list of filtered TouristSpots", async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: [
            { name: "Test Spot 1", photos: [], rating: 5 },
            { name: "Test Spot 2", photos: [], rating: 4 },
          ],
        });
      
        const result = await filterByName("Test");
        expect(result).toEqual([
          { name: "Test Spot 1", photos: [], rating: 5 },
          { name: "Test Spot 2", photos: [], rating: 4 },
        ]);
      });      
});
