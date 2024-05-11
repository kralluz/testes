// routes/exam.router.js
import express from "express";
import ExamController from "../controllers/exam.controller.js";
import validateData from "../middlewares/validate.middleware.js";
import { createExam, updateExam } from "../schemas/exam.schema.js";

const router = express.Router();

router.post("/exams", validateData(createExam), ExamController.create);
router.get("/exams", ExamController.findAll);
router.get("/exams/:id", ExamController.findOne);
router.patch("/exams/:id", validateData(updateExam), ExamController.update);
router.delete("/exams/:id", ExamController.delete);

export default router;
