import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET REVIEWS
export const getReviews = async (productId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/reviews/${productId}/reviews`
    );

    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

interface ReviewResponse {
  message: string;
  review?: {
    product: string;
    user: string;
    name: string;
    rating: number;
    title: string;
    comment: string;
  };
}

// ADD REVIEW
export const addReview = async (
  rating: number,
  title: string,
  comment: string,
  productId: string
): Promise<"missing" | "fail" | "success" | ReviewResponse> => {
  if (rating === 0 || comment === "") {
    return "missing";
  }

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post<ReviewResponse>(
      `${API_URL}/api/reviews/${productId.toString()}/reviews`,
      { rating, title, comment },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.data.message === "success") {
      return "success";
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "Error adding review:",
      error.response?.data || error.message
    );

    return "fail";
  }
};
