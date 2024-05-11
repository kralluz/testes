import { z } from "zod";
import { appointmentSchema } from "./appointment.schema.js";

// Schema para Exam
const examSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  // doctor: doctorSchema,
  doctor_id: z.number().int(),
  appointments: z.array(appointmentSchema),
});

const createExam = examSchema.pick({
  name: true,
  doctor_id: true,
});

const updateExam = examSchema.partial({
  name: true,
  doctor_id: true,
});

export { examSchema, createExam, updateExam };
