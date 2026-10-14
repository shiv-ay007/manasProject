// controllers/appointmentController.js
import Appointment from "../models/appointement.model.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const createAppointment = async (req, res) => {
    try {
    const { fname, email, phone, patientType, reason, description } = req.body;
    return console.log(req.body)
    const appointment = new Appointment(req.body);

    await appointment.save();
 const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "suhel.codecrafter@gmail.com",
  // to: 'aggarwal.manas@gmail.com',
  subject: "New Inquiry from Website",
  html: `
    <p>Dear Director,</p>

    <p>
      You have received a new inquiry from the website 
      <a href="https://drmanasaggarwal.com/" target="_blank">
        https://drmanasaggarwal.com
      </a>. Below are the details:
    </p>

    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
  <tr><td><strong>Name</strong></td><td>${fname || ""}</td></tr>
  <tr><td><strong>Email</strong></td><td>${email || ""}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${phone || ""}</td></tr>
  <tr><td><strong>Patient Type</strong></td><td>${patientType || ""}</td></tr>
  <tr><td><strong>Reason</strong></td><td>${reason || ""}</td></tr>
  <tr><td><strong>Message</strong></td><td>${description || ""}</td></tr>
</table>

    <p>Please respond to this inquiry as soon as possible.</p>

    <br/>
    <p>Kindest Regards,<br/>
    Code Crafter Web Solutions<br/>
    P: +91 9336969289<br/>
    O: +91 8840700176<br/>
    W: <a href="https://codecrafter.co.in/" target="_blank">https://codecrafter.co.in/</a>
    </p>
  `,
};


    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Appointment created and email sent", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
};
