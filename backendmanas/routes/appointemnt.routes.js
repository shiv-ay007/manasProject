import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
} from "../controller/appointement.controller.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);

export default router;
