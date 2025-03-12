import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/api/comment`;

export async function createComment(content: string, touristSpotName: string) {
  try {
    const response = await axios.post(
      url,
      {
        touristSpotName,
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error trying to create comment.");
  }
}

export async function getComments(touristSpotName: string) {
  try {
    const response = await axios.get(
      `${url}/by-tourist-spot?touristSpotName=${touristSpotName}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return Array.isArray(response.data)
      ? response.data.map((data) => data)
      : [];
  } catch (error: any) {
    console.log(error);

    return error.response?.status === 404
      ? [{ message: "You don't have any comments yet" }]
      : [{ message: "Error trying to get comments." }];
  }
}

export async function deleteComment(commentId: number) {
  try {
    await axios.delete(`${url}/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error trying to delete comment.");
  }
}

export async function updateComment(content: string, id: number) {
  try {
    await axios.put(
      `${url}/${id}`,
      {
        Content: content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error trying to update comment.");
  }
}
