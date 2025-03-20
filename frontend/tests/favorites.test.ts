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
        expect(mockedAxios.get).toHaveBeenCalledWith(
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
    it("should return an error if remove favorite failed", async () => {
        const touristSpotName = "Test Spot";

        await expect(removeFavorite(touristSpotName)).resolves.toEqual({ message: "Removed favorite successfully" });
        expect(mockedAxios.delete).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/favorite/delete?name=${encodeURIComponent(touristSpotName)}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                
            }
        );
    });

});

