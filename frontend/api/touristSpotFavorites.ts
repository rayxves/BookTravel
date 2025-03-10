import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/favorite`;

export const getFavorites = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data.map((data) => {
      return data;
    });
  } catch (error: any) {
    console.log(error);
    return error.response?.message?.data || "Error trying to add favorite.";
  }
};

export const removeFavorite = async (touristSpotName: string) => {
  try {
    await axios.delete(`${url}/delete?name=${encodeURIComponent(touristSpotName)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return "Removed favorite successfully";
  } catch (error: any) {
    console.log(error);
    return "Error trying to remove favorite.";
  }
};
