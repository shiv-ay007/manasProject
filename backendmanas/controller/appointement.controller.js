// controllers/appointmentController.js
import Appointment from "../models/appointement.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const createAppointment = async (req, res) => {
  try {
    const { fname, lname, email, phone, patientType, reason, description } = req.body;

    const appointment = new Appointment({
      fname,
      lname,
      email,
      phone,
      patientType,
      reason,
      description,
    });

    await appointment.save();

    // Mail notification (safe execution so failure doesn't block appointment save)
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "shivam.yadav.cse01@gmail.com",
        subject: "New Callback / Appointment Request from Website",
        html: `
          <p>Dear Dr Manas Aggrawal,</p>
          <p>
            You have received a new inquiry from the website 
            <a href="https://drmanasaggarwal.com/" target="_blank">
              https://drmanasaggarwal.com
            </a>. Below are the details:
          </p>
          <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
            <tr><td><strong>Name</strong></td><td>${fname || ""} ${lname || ""}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email || "N/A"}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr>
            <tr><td><strong>Patient Type</strong></td><td>${patientType || "N/A"}</td></tr>
            <tr><td><strong>Reason</strong></td><td>${reason || "N/A"}</td></tr>
            <tr><td><strong>Message / Concern</strong></td><td>${description || "N/A"}</td></tr>
          </table>
          <p>Please respond to this inquiry as soon as possible.</p>
        `,
      };

      // Non-blocking background email sending (so user gets instant response)
      transporter.sendMail(mailOptions).catch((mailErr) => {
        console.error("Background mail error:", mailErr.message);
      });
    } catch (mailErr) {
      console.error("Mail send error (appointment saved in DB):", mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ success: false, error: "Failed to create appointment" });
  }
};

// Backend Filter & Pagination for Appointments / Callback Requests
export const getAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, phone, reason, patientType } = req.query;

    const query = {};

    if (name && name.trim()) {
      const nameRegex = { $regex: name.trim(), $options: "i" };
      query.$or = [{ fname: nameRegex }, { lname: nameRegex }];
    }

    if (phone && phone.trim()) {
      query.phone = { $regex: phone.trim(), $options: "i" };
    }

    if (reason && reason.trim()) {
      query.reason = reason.trim();
    }

    if (patientType && patientType.trim()) {
      query.patientType = patientType.trim();
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalPages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Fetch appointments error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch appointments" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, error: "Appointment not found" });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch appointment" });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Delete appointment error:", error);
    res.status(500).json({ success: false, error: "Failed to delete appointment" });
  }
};
