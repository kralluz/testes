// appointment.service.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AppointmentService {
  static async create(data) {
    try {
      return await prisma.appointment.create({
        data: {
          patient_name: data.patient_name,
          patient_phone: data.patient_phone,
          doctor: { connect: { id: data.doctor_id } }, // Estabelecendo o relacionamento com o médico
          exam: { connect: { id: data.exam_id } }, // Estabelecendo o relacionamento com o exame
          appointment: data.appointment,
          status: data.status,
        }
      });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar o agendamento');
    }
  }

  static async findMany() {
    try {
      return await prisma.appointment.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar os agendamentos');
    }
  }

  static async findUnique(id) {
    try {
      return await prisma.appointment.findUnique({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar o agendamento');
    }
  }

  static async update(id, data) {
    try {
      return await prisma.appointment.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar o agendamento');
    }
  }

  static async delete(id) {
    try {
      return await prisma.appointment.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao excluir o agendamento');
    }
  }
}

export default AppointmentService;
