import axios from "axios";

export async function getTouristSpotsByName(name: string) {
  const url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/tourist-spot`;
  try {
    const response = await axios.get(
      `${url}/by-name?name=${encodeURIComponent(name)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data.results;
  } catch (error: any) {
    return error.message || "Error trying to get tourist spots.";
  }
}
