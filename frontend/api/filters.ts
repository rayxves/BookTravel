import axios from "axios";

export async function filterByName(
  name: string,
  type?: string,
  rating?: number,
  minPrice?: number,
  maxPrice?: number
) {
  try {
    let url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/tourist-spot/by-name-filter`;
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (type) params.append("type", type);
    if (rating !== undefined){ params.append("rating", rating.toString());}
    if (minPrice !== undefined && minPrice !== 0){params.append("minPrice", minPrice.toString());}
    if (maxPrice !== undefined && minPrice !== 0){params.append("maxPrice", maxPrice.toString());}

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    return response.data.results;
  } catch (error: any) {
    throw new Error(error.message || "Error trying to filter data.");
  }
}
