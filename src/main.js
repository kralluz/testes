import express from "express";
import "dotenv/config";
import doctorRouter from './routes/doctor.router.js';
import DoctorConfigRouter from "./routes/doctorConfig.router.js";
import appointmentRouter from './routes/appointment.router.js';
import examRouter from './routes/exam.router.js';

const app = express();
app.use(express.json());
// Roteadores
app.use(doctorRouter); 
app.use(DoctorConfigRouter);
app.use(appointmentRouter);
app.use(examRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
