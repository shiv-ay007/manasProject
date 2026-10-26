import mongoose from "mongoose";

const appointementSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    patientType: { type: String },
    reason: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointementSchema);
export default Appointment;
