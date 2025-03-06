import { GetFavorites } from "../api/touristSpotFavorites";
import axios from "axios";

interface Favorite {
    id: number;
    name: string;
    description: string;
    rating: number;
    photoUrls: string[];
}

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get favorites", () => {
    it("should call the API with the correct token", async () => {
        const token = "test123";
        const favorites: Favorite[] = [{
            id: 1,
            name: "Test Spot",
            description: "This is a test spot.",
            rating: 5,
            photoUrls: ["photo1.jpg", "photo2.jpg"],
        }];
        mockedAxios.get.mockResolvedValueOnce({ data: favorites });

        await expect(GetFavorites(token)).resolves.toEqual(favorites);
        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/favorite`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    });
})