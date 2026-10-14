import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Testonomial = () => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const placeId = '0x399bfb781a8e1edf:0xbb68c9fe3bbab90b'; // Your Place ID
  const apiKey = 'AIzaSyC9ZOZHwHmyTWXqACqpZY2TL7wX2_Zn05U'; // Your Google API key
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `${proxyUrl}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
        );

        setPlaceDetails(response.data.result);

        // Extract reviews from the response
        if (response.data.result.reviews) {
          setReviews(response.data.result.reviews);
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [placeId, apiKey]);

  if (!placeDetails) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="place-details">
      <h2>{placeDetails.name}</h2>
      <img src={placeDetails.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}&key=${apiKey}` : 'default-image.jpg'} alt={placeDetails.name} />
      <p>{placeDetails.formatted_address}</p>
      <p>Rating: {placeDetails.rating}</p>
      <p>{placeDetails.formatted_phone_number}</p>
      <a href={placeDetails.url} target="_blank" rel="noopener noreferrer">View on Google Maps</a>

      <h3>Reviews:</h3>
      <div className="reviews">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.time} className="review">
              <h4>{review.author_name}</h4>
              <p>{review.text}</p>
              <p>Rating: {review.rating}</p>
              <p>{new Date(review.time * 1000).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Testonomial;
