import { model, Schema } from "mongoose";

const inquirySchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    concern: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const InquiryModel = model("DR_MANAS_MODEL", inquirySchema);

export default InquiryModel;
