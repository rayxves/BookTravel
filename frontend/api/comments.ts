import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/comment`;

export async function createComment(content: string, touristSpotName: string) {
  try {
    const response = await axios.post(url, {
        touristSpotName: touristSpotName,
        content: content,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      

    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response?.message?.data || "Error trying to create comment.";
  }
}
