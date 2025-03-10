import { getFavorites, removeFavorite } from "../api/touristSpotFavorites";
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
        const favorites: Favorite[] = [{
            id: 1,
            name: "Test Spot",
            description: "This is a test spot.",
            rating: 5,
            photoUrls: ["photo1.jpg", "photo2.jpg"],
        }];
        mockedAxios.get.mockResolvedValueOnce({ data: favorites });

        await expect(getFavorites()).resolves.toEqual(favorites);
        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/favorite`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
               
            }
        );
    });
})

describe("remove favorite", () => {
    it("should call the API with the correct token", async () => {
        const touristSpotName = "Test Spot";

        await expect(removeFavorite(touristSpotName)).resolves.toBe("Removed favorite successfully");
        expect(axios.delete).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/favorite/delete`,
            {
                data: { name: touristSpotName },
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                
            }
        );
    });

    it("should handle errors", async () => {
        const touristSpotName = "Test Spot";
        mockedAxios.delete.mockRejectedValueOnce({response: {
            data: {
                message: "Error trying to remove favorite.",
            },
        }});

        await expect(removeFavorite(touristSpotName)).resolves.toBe("Error trying to remove favorite.");
    }
)
});

