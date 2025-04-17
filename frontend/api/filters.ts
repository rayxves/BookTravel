import axios from "axios";

export async function filterByName(
  name: string,
  type: string,
  rating?: number,
  priceLevel?: number
) {
  try {
    let url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/tourist-spot/by-name-filter`;
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (type) params.append("type", type);
    if (rating !== undefined) {
      params.append("minRating", rating.toString());
    }
    if (priceLevel !== undefined && priceLevel !== 0) {
      params.append("priceLevel", priceLevel.toString());
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.results;
  } catch (error: any) {
    if (error.status === 404) {
      return [];
    }
    throw new Error(error.message || "Error trying to filter data.");
  }
}

export async function filterByLocation(
  latitude: number,
  longitude: number,
  type: string,
  rating?: number,
  priceLevel?: number
) {
  try {
    let url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/tourist-spot/by-location`;
    const params = new URLSearchParams();

    if (latitude) params.append("latitude", latitude.toString());
    if (longitude) params.append("longitude", longitude.toString());
    if (type) params.append("type", type);
    if (rating !== undefined) {
      params.append("minRating", rating.toString());
    }
    if (priceLevel !== undefined && priceLevel !== 0) {
      params.append("priceLevel", priceLevel.toString());
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.results;
  } catch (error: any) {
    if (error.status === 404) {
      return [];
    }
    throw new Error(error.message || "Error trying to filter data.");
  }
}
