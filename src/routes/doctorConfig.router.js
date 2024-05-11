// routes/config.router.js
import express from "express";
import DoctorConfigController from "../controllers/doctorconfig.controller.js";
import validateData from "../middlewares/validate.middleware.js";
import { updateDoctorConfig } from "../schemas/doctorConfig.schema.js";

const DoctorConfigRouter = express.Router();

DoctorConfigRouter.post(
  "/configs",
  DoctorConfigController.create
);
DoctorConfigRouter.get("/configs", DoctorConfigController.findAll);
DoctorConfigRouter.get("/configs/:id", DoctorConfigController.findOne);
DoctorConfigRouter.patch(
  "/configs/:id",
  validateData(updateDoctorConfig),
  DoctorConfigController.update
);
DoctorConfigRouter.delete("/configs/:id", DoctorConfigController.delete);

export default DoctorConfigRouter;
