import { z } from "zod";
// import {doctorSchema} from "./doctor.schema.js";

const doctorConfigSchema = z.object({
  id: z.number().int(),
  doctor: z.string(),
  doctor_id: z.number().int(),
  appts_per_hour: z.string().nullable(),
  interval: z.string(),
  start_time: z.string(),
  end_time: z.string(),
});

const createDoctorConfig = doctorConfigSchema.pick({
  doctor_id: true,
  appts_per_hour: true,
  interval: true,
  start_time: true,
  end_time: true,
});

const updateDoctorConfig = doctorConfigSchema.partial({
  doctor_id: true,
  appts_per_hour: true,
  interval: true,
  start_time: true,
  end_time: true,
});

export {
  doctorConfigSchema,
  createDoctorConfig,
  updateDoctorConfig,
};
