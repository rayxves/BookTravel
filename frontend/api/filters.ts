import axios from "axios";

export async function filterByName(
    name: string,
    type?: string,
    rating?: number,
    minPrice?: number,
    maxPrice?: number
  ) {
    try {
      let url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/tourist-spot`;
      const params = new URLSearchParams();
  
      if (name) params.append("name", name);
      if (type) params.append("type", type);
      if (rating !== undefined) params.append("rating", rating.toString());
      if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
      if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());
  
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
  
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Error trying to filter data.");
    }
  }
  