import { z } from "zod";
import { appointmentSchema } from "./appointment.schema.js";
import { doctorConfigSchema } from "./doctorConfig.schema.js";

const doctorSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  specialty: z.string().nullable(),
  appointments: z.array(appointmentSchema),
  doctorConfigs: z.array(doctorConfigSchema),
});

const createDoctor = doctorSchema.pick({
  name: true,
  specialty: true,
});

const updateDoctor = doctorSchema.partial({
  name: true,
  specialty: true,
});

export { doctorSchema, createDoctor, updateDoctor };
