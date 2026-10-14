// controllers/crafterController.js


import ConnectionToSecondaryDB from "../config/secondaydbConnection.js";
import AppError from "../utlis/error.utlis.js";
import createCrafterModel from "../models/code.model.js"
import nodemailer from 'nodemailer'; // Import Nodemailer

const addCrafterReview = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, message } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !phoneNumber || !message) {
            return next(new AppError("All fields are required", 400));
        }

        // Validate email format using a regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            return next(new AppError("Please enter a valid email address", 400));
        }

        // Validate phone number (starts with 6-9 and is 10 digits long)
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(phoneNumber)) {
            return next(new AppError("Phone number must start with 6-9 and be 10 digits long", 400));
        }

        // Connect to the secondary database and create the Crafter model
        const secondaryConnection = await ConnectionToSecondaryDB();
        const Crafter = createCrafterModel(secondaryConnection);

        // Save the review to the secondary database
        const review = await Crafter.create({
            name,
            email,
            phoneNumber,
            message,
        });

        if (!review) {
            return next(new AppError("Review not saved, something went wrong", 402));
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email (e.g., ayushm185@gmail.com)
                pass: process.env.EMAIL_PASSWORD, // Your email password or app password
            },
        });

        // Prepare email details
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to: 'codecrafter73@gmail.com',  // Forwarded email (the recipient)
            subject: 'New Review Received',
            text: `You have received a new Review from:\n\n` +
                  `Name: ${name}\n` +
                  `Email: ${email}\n` +
                  `Phone: ${phoneNumber}\n` +
                  `Message: ${message}\n\n` +
                  `Thank you for reaching out!`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        res.status(200).json({
            success: true,
            message: "Review saved successfully",
            data: review,
        });

        // Optional: Close the secondary connection when done
        secondaryConnection.close();

    } catch (error) {
        console.error('Error:', error);
        return next(new AppError("An error occurred while processing your review", 500));
    }
};

const getCrafterReviews = async (req, res, next) => {
    try {
        // Connect to the secondary database and create the Crafter model
        const secondaryConnection = await ConnectionToSecondaryDB();
        const Crafter = createCrafterModel(secondaryConnection);

        // Fetch all reviews from the secondary database
        const reviews = await Crafter.find();

        // Check if reviews were found
        if (!reviews || reviews.length === 0) {
            return next(new AppError("No reviews found", 404));
        }

        // Send the response with the retrieved reviews
        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: reviews,
        });

        // Optional: Close the secondary connection when done
        secondaryConnection.close();

    } catch (error) {
        console.error('Error:', error);
        return next(new AppError("An error occurred while retrieving reviews", 500));
    }
};






export { addCrafterReview,getCrafterReviews };
