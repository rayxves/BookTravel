import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/favorite`;

export const GetFavorites = async (token: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response?.message?.data || "Error trying to add favorite.";
  }
};
