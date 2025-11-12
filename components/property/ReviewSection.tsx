import React, { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  id: string | number;
  author?: string;
  rating?: number;
  comment: string;
  date?: string;
}

interface Props {
  propertyId: string | number;
}

const ReviewSection: React.FC<Props> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        // Expecting response.data to be an array of reviews
        setReviews(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p className="p-4">Loading reviews...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  if (reviews.length === 0) return <p className="p-4">No reviews yet.</p>;

  return (
    <div className="space-y-4 p-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded p-4 bg-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{review.author ?? "Anonymous"}</p>
              <p className="text-sm text-gray-500">{review.date ?? ""}</p>
            </div>
            {typeof review.rating === "number" && (
              <div className="text-yellow-500 font-semibold">{review.rating} ★</div>
            )}
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
