import { z } from "zod";

const appointmentSchema = z.object({
  id: z.number().int(),
  patient_name: z.string().nullable(),
  patient_phone: z.string().nullable(),
  doctorId: z.number().int(),
  exam_id: z.number().int(),
  appointment: z.string().nullable(),
  status: z.string().nullable(),
});

const createAppointment = appointmentSchema.pick({
  patient_name: true,
  patient_phone: true,
  doctor_id: true,
  exam_id: true,
  appointment: true,
  status: true,
});

const updateAppointment = appointmentSchema.partial({
  patient_name: true,
  patient_phone: true,
  doctor_id: true,
  exam_id: true,
  appointment: true,
  status: true,
});

export {
  appointmentSchema,
  createAppointment,
  updateAppointment,
};