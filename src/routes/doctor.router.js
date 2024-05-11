// routes/doctor.router.js
import express from "express";
import DoctorController from "../controllers/doctor.controller.js";
import validateData from "../middlewares/validate.middleware.js";
import { createDoctor, updateDoctor } from "../schemas/doctor.schema.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/doctors", validateData(createDoctor), DoctorController.create);
router.get("/doctors", DoctorController.findAll);
router.get("/doctors/:id", DoctorController.findOne);
router.patch(
    "/doctors/:id",
    validateData(updateDoctor),
    DoctorController.update
);
router.delete("/doctors/:id", DoctorController.delete);

router.get("/api/availability/:doctorId/:date", async (req, res) => {
    try {
        const { doctorId, date } = req.params;
        const doctorConfig = await prisma.config.findFirst({
            where: { doctor_id: parseInt(doctorId) },
        });

        if (!doctorConfig) {
            return res
                .status(404)
                .json({ error: "Configurações do médico não encontradas" });
        }

        const {
            start_time,
            end_time,
            start_interval_time,
            end_interval_time,
            appts_per_hour,
        } = doctorConfig;

        // Converter a data para o formato correto
        const selectedDate = new Date(date);

        // Criar array para armazenar os slots de horário
        const availableSlots = [];

        // Definir o intervalo de tempo entre as consultas em minutos
        const intervalMinutes = 60 / doctorConfig.appts_per_hour;


        // Definir o horário inicial como o horário de início do expediente do médico
        let currentTime = new Date(selectedDate);
        currentTime.setHours(
            start_time.getHours(),
            start_time.getMinutes(),
            0,
            0
        );

        // Loop para criar os horários pré-definidos para o dia especificado
        while (currentTime < end_time) {
            // Verificar se o horário atual é o horário de término do expediente
            if (currentTime.getHours() === end_time.getHours() && currentTime.getMinutes() === end_time.getMinutes()) {
                break; // Se for, interromper o loop
            }

            // Adicionar o slot de horário ao array de slots
            availableSlots.push({
                horario: currentTime.toISOString(), // Armazena o horário completo como string
                ocupado: false, // Inicialmente define o slot como não ocupado
                doctor_id: doctorId,
                patient_name: null,
            });

            // Avançar para o próximo horário com base no intervalo de tempo
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }

        // Retornar os slots de horário como resposta
        res.json(availableSlots);
    } catch (error) {
        console.error("Erro ao obter horários disponíveis:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


router.get("/seq/:doctorId/:date", async (req, res) => {
    try {
        const { doctorId, date } = req.params;
        const start_time = new Date(); // Defina o horário de início desejado
        const end_time = new Date(); // Defina o horário de término desejado
        const start_interval_time = new Date(); // Defina o horário de início do intervalo desejado
        const end_interval_time = new Date(); // Defina o horário de término do intervalo desejado
        const appts_per_hour = 2; // Defina o número de consultas por hora desejado
        const morning_capacity = 5; // Defina a capacidade da manhã desejada
        const afternoon_capacity = 4; // Defina a capacidade da tarde desejada

        // Converter a data para o formato correto
        const selectedDate = new Date(date);

        // Criar array para armazenar os slots de horário
        const availableSlots = [];

        // Definir o intervalo de tempo entre as consultas em minutos
        const intervalMinutes = 60 / appts_per_hour;

        // Definir o horário inicial como o horário de início do expediente do médico
        let currentTime = new Date(selectedDate);
        currentTime.setHours(
            start_time.getHours(),
            start_time.getMinutes(),
            0,
            0
        );

        // Criar os horários pré-definidos para a parte da manhã
        for (let i = 0; i < morning_capacity; i++) {
            // Adicionar o slot de horário ao array de slots
            availableSlots.push({
                horario: currentTime.toISOString(), // Armazena o horário completo como string
                ocupado: false, // Inicialmente define o slot como não ocupado
                doctor_id: doctorId,
                patient_name: null,
            });

            // Avançar para o próximo horário com base no intervalo de tempo
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }

        // Definir o horário inicial para a parte da tarde
        currentTime.setHours(
            end_interval_time.getHours(),
            end_interval_time.getMinutes(),
            0,
            0
        );

        // Criar os horários pré-definidos para a parte da tarde
        for (let i = 0; i < afternoon_capacity; i++) {
            // Adicionar o slot de horário ao array de slots
            availableSlots.push({
                horario: currentTime.toISOString(), // Armazena o horário completo como string
                ocupado: false, // Inicialmente define o slot como não ocupado
                doctor_id: doctorId,
                patient_name: null,
            });

            // Avançar para o próximo horário com base no intervalo de tempo
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }

        // Retornar os slots de horário como resposta
        res.json(availableSlots);
    } catch (error) {
        console.error("Erro ao obter horários disponíveis:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
export default router;
