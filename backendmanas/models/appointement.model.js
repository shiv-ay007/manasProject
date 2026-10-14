import mongoose  from "mongoose";

const appointementSchema = new mongoose.Schema({
   fname:{type:String,},
   lname:{type:String,},
   patientType:{type:String},
   reason:{type:String},
   description:{type:String}
})

const Appointment = mongoose.model("Appointment",appointementSchema)
export default Appointment