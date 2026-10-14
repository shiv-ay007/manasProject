import InquiryModel from "../models/inquiry.model.js";
import AppError from "../utlis/error.utlis.js";
import nodemailer from 'nodemailer'; // Import Nodemailer

const addInquiry = async (req, res, next) => {
    try {
        const { fullName, email, phoneNumber, message } = req.body;

        console.log(req.body);
        

        console.log("hi i am coming or not ");
        

        // Validate input fields
        if (!fullName || !email || !phoneNumber || !message) {
            return next(new AppError("All fields are required", 400));
        }

        if (phoneNumber.length !== 10) {
            return next(new AppError("Phone number must be 10 digits", 400));
        }

        // Save inquiry to the database
        const inquiry = await InquiryModel.create({
            fullName,
            email,
            phoneNumber,
            message,
        });

        if (!inquiry) {
            return next(new AppError("Inquiry not sent, something went wrong", 402));
        }

        // Nodemailer configuration to send email
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
            to: 'aggarwal.manas@gmail.com',  // Forwarded email (the recipient)
            subject: 'New Inquiry Received',
            text: `You have received a new inquiry from:\n\n` +
                  `Name: ${fullName}\n` +
                  `Email: ${email}\n` +
                  `Phone: ${phoneNumber}\n` +
                  `Message: ${message}\n\n` +
                  `Thank you for reaching out!`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        // Send the response back to the client
        res.status(200).json({
            success: true,
            message: "Inquiry sent successfully and email forwarded.",
            data: inquiry,
        });

    } catch (error) {
        console.error('Error:', error);
        return next(new AppError("An error occurred while processing your inquiry", 500));
    }
};

const addInquiry1 = async (req, res, next) => {
  try {
      const {fullName,contactNumber,country,city,address,message} = req.body;

      console.log(req.body);
      


      
   

      // Validate input fields
      if (!fullName || !contactNumber || !country || !city || !address || !message){
          return next(new AppError("All fields are required", 400));
      }

      if (contactNumber.length !== 10) {
          return next(new AppError("Phone number must be 10 digits", 400));
      }


      // Nodemailer configuration to send email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER, 
              pass: process.env.EMAIL_PASSWORD, 
          },
      });

      // Prepare email details
      const mailOptions = {
          from: process.env.EMAIL_USER, // Sender's email
          to: 'ayushm185@gmail.com',  // Forwarded email (the recipient)
          subject: 'New Inquiry Received',
          text: `You have received a new inquiry from:\n\n` +
                `fullName: ${fullName}\n` +
                `Contact Number: ${contactNumber}\n` +
                `Country: ${country}\n`+
                `City: ${city}\n`+
                `Message: ${message}\n\n` +
                `Thank you for reaching out!`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      // Send the response back to the client
      res.status(200).json({
          success: true,
          message: "Inquiry sent successfully and email forwarded.",
       
      });

  } catch (error) {
      console.error('Error:', error);
      return next(new AppError("An error occurred while processing your inquiry", 500));
  }
};


const addInquiry2 = async (req, res, next) => {
  try {
      const {name,number} = req.body;

      console.log(req.body);
      


      
   

      // Validate input fields
      if (!name || !number){
          return next(new AppError("All fields are required", 400));
      }

      if (number.length !== 10) {
          return next(new AppError("Phone number must be 10 digits", 400));
      }


      // Nodemailer configuration to send email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER, 
              pass: process.env.EMAIL_PASSWORD, 
          },
      });

      // Prepare email details
      const mailOptions = {
          from: process.env.EMAIL_USER, // Sender's email
          to: 'mohdsuhel.dev@gmail.com',  // Forwarded email (the recipient)
          subject: 'New Inquiry Received for Pristine tower from website',
          text: `Dear Team,\n\n` +
          `We have received a new inquiry with the following details:\n` +
          `Name: ${name}\n` +
          `Phone Number: ${number}\n` +
          `Email Address: ${email}\n` +
          `Please address this inquiry at the earliest convenience.\n` +
          `Best regards,\n` +
          `Code Crafter Team`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Send the response back to the client
      res.status(200).json({
          success: true,
          message: "Inquiry sent successfully and email forwarded.",
       
      });

  } catch (error) {
      console.error('Error:', error);
      return next(new AppError("An error occurred while processing your inquiry", 500));
  }
};


const addInquiry3 = async (req, res, next) => {
  try {
      const {fullName,phoneNumber, message, email} = req.body


      // Validate input fields
      if (!fullName || !phoneNumber || !message || !email){
          return next(new AppError("All fields are required", 400));
      }
      // Nodemailer configuration to send email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER, 
              pass: process.env.EMAIL_PASSWORD, 
          },
      });

      // Prepare email details
      const mailOptions = {
          from: process.env.EMAIL_USER, // Sender's email
          to: 'saumya.751983@gmail.com',  // Forwarded email (the recipient)
          subject: 'New Inquiry Received  from Dr Somya website',
          text: `You have received a new inquiry from:\n\n` +
          `Name: ${fullName}\n` +
          `Email: ${email}\n` +
          `Phone: ${phoneNumber}\n` +
          `Message: ${message}\n\n` +
          `Thank you for reaching out!`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Send the response back to the client
      res.status(200).json({
          success: true,
          message: "Inquiry sent successfully and email forwarded.",
       
      });

  } catch (error) {
      console.error('Error:', error);
      return next(new AppError("An error occurred while processing your inquiry", 500));
  }
};


const addInquiry4 = async (req, res, next) => {
  try {
      const { name, number, service, message, email } = req.body;

      // Validate input fields
      if (!name || !number || !service || !message || !email) {
          return next(new AppError("All fields are required", 400));
      }

      // Nodemailer configuration to send email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
          },
      });

      // Prepare email details
      const mailOptions = {
          from: process.env.EMAIL_USER, // Sender's email
          to: 'info@xpresstourtravels.com',  // Forwarded email (the recipient)
          subject: 'New Inquiry Received',
          text: `Dear Team,\n\n` +
                `We have received a new inquiry with the following details:\n` +
                `Name: ${name}\n` +
                `Phone Number: ${number}\n` +
                `Email Address: ${email}\n` +
                `Service: ${service}\n` +
                `Message: ${message}\n\n` +
                `Please address this inquiry at the earliest convenience.\n` +
                `Best regards,\n` +
                `Code Crafter Team`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Send the response back to the client
      res.status(200).json({
          success: true,
          message: "Inquiry sent successfully and email forwarded.",
      });

  } catch (error) {
      console.error('Error:', error);
      return next(new AppError("An error occurred while processing your inquiry", 500));
  }
};




const getInquiry = async (req, res, next) => {
  try {
    const allInquiry = await InquiryModel.find({});

    if (!allInquiry) {
      return next(new AppError("Inquiry Not Found", 402));
    }

    res.status(200).json({
      success: true,
      message: "All Inquiry are:-",
      data: allInquiry,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validInquiry = await InquiryModel.findById(id);

    if (!validInquiry) {
      return next(new AppError("Inquiry is Not Valid", 400));
    }

    const deleteInquiry = await InquiryModel.findByIdAndDelete(id);

    // await InquiryModel.save();

    res.status(200).json({
      success: true,
      message: "Inquiry Delete Succesfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteAllInquiries = async (req, res, next) => {
  try {
    const result = await InquiryModel.deleteMany({}); // Deletes all inquiries
    console.log(result);

    if (result.deletedCount === 0) {
      return next(new AppError("No inquiries to delete", 400));
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} inquiries deleted successfully`,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const addQuotes = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      city,
      country,
      pincode,
      productName,
      productQuantity,
      productPrice,
    } = req.body;

    // Validate input fields
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !address ||
      !city ||
      !country ||
      !pincode ||
      !productName ||
      !productQuantity ||
      !productPrice
    ) {
      return next(new AppError("All fields are required", 400));
    }

    if (phoneNumber.length !== 10) {
      return next(new AppError("Phone number must be 10 digits", 400));
    }

    // Nodemailer configuration to send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    // Prepare HTML email template
    const emailTemplate = `
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #4CAF50;">New Product Quote Request</h2>
          <p style="font-size: 16px;">You have received a new product quote request with the following details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Email:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Phone Number:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${phoneNumber}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Address:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${address}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">City:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Country:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${country}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Pincode:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${pincode}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Product Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Quantity:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${productQuantity}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Price:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${productPrice}</td>
            </tr>
          </table>
          <p style="font-size: 16px;">Thank you for choosing our services!</p>
          <footer style="text-align: center; font-size: 14px; color: #888;">
            <p>© 2025 Ashirwad Vastu</p>
          </footer>
        </div>
      </body>
      </html>
    `;

    // Prepare email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ayushm185@gmail.com",
      subject: "New Product Quote Request",
      html: emailTemplate,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Send the response back to the client
    res.status(200).json({
      success: true,
      message: "Quote request sent successfully and email forwarded.",
    });
  } catch (error) {
    console.error("Error:", error);
    return next(
      new AppError("An error occurred while processing your quote request", 500)
    );
  }
};



export { addInquiry, getInquiry, deleteInquiry, deleteAllInquiries ,addInquiry1,addQuotes,addInquiry2,addInquiry3,addInquiry4};
