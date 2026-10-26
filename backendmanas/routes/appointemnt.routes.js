import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from "../controller/appointement.controller.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.delete("/:id", deleteAppointment);

export default router;
