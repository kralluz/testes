// appointment.controller.js

import AppointmentService from "../services/appointment.service.js";

class AppointmentController {
  static async create(req, res) {
    try {
      return res.status(201).json(await AppointmentService.create(req.body));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar o agendamento" });
    }
  }

  static async findAll(req, res) {
    try {
      const appointments = await AppointmentService.findMany();
      return res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar os agendamentos" });
    }
  }

  static async findOne(req, res) {
    const { id } = req.params;
    try {
      const appointment = await AppointmentService.findUnique(parseInt(id));
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      return res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar o agendamento" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
      const updatedAppointment = await AppointmentService.update(parseInt(id), newData);
      return res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar o agendamento" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await AppointmentService.delete(parseInt(id));
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir o agendamento" });
    }
  }
}

export default AppointmentController;
