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
    throw new Error(
      error.message || "Error trying to get favorites."
    );
  }
};

export const removeFavorite = async (touristSpotName: string) => {
  try {
    await axios.delete(
      `${url}/delete?name=${encodeURIComponent(touristSpotName)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return { message: "Removed favorite successfully" };
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "Error trying to remove favorite."
    );
  }
};
