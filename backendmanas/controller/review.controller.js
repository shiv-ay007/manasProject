// controllers/reviewController.js
import axios from 'axios';

/**
 * Fetch all reviews from Google Business Profile using the Google Places API.
 */
const fetchReviews = async (req, res) => {
    const placeId = 'ChIJ3x6OGnj7mzkRC7m6O_7JaLs'; // Your Place ID
    const apiKey = 'AIzaSyC9ZOZHwHmyTWXqACqpZY2TL7wX2_Zn05U'; // Your Google API key
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        // Check if the response contains the reviews
        if (response.data && response.data.result && response.data.result.reviews) {
            // Extract and return review data
            const reviews = response.data.result.reviews.map(review => ({
                author_name: review.author_name,
                rating: review.rating,
                text: review.text,
                time: new Date(review.time * 1000).toLocaleString(), // Convert Unix timestamp to a readable format
            }));

            // Respond with the reviews
            return res.status(200).json({
                success:true,
                message:"All Review are:-",
                data:reviews
            })
            // return res.json({ reviews });
        } else {
            // Handle the case when no reviews are found
            return res.status(404).json({ message: 'No reviews found for this place.' });
        }
    } catch (error) {
        // Log the error and respond with a failure message
        console.error('Error fetching reviews:', error.message);
        return res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
};

export default fetchReviews;
