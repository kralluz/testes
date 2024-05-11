// routes/doctor.router.js
import express from "express";
import DoctorController from "../controllers/doctor.controller.js";
import validateData from "../middlewares/validate.middleware.js";
import { createDoctor, updateDoctor } from "../schemas/doctor.schema.js";

const router = express.Router();

router.post("/doctors", validateData(createDoctor), DoctorController.create);
router.get("/doctors", DoctorController.findAll);
router.get("/doctors/:id", DoctorController.findOne);
router.patch("/doctors/:id", validateData(updateDoctor), DoctorController.update);
router.delete("/doctors/:id", DoctorController.delete);

export default router;
