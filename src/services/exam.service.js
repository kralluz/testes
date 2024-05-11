// exam.service.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ExamService {
  static async create(data) {
    try {
      return await prisma.exam.create({ 
        data: { 
          name: data.name, 
          doctor: { connect: { id: data.doctor_id } } 
        } 
      });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar o exame');
    }
  }

  static async findMany() {
    try {
      return await prisma.exam.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar os exames');
    }
  }

  static async findUnique(id) {
    try {
      return await prisma.exam.findUnique({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar o exame');
    }
  }

  static async update(id, data) {
    try {
      return await prisma.exam.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar o exame');
    }
  }

  static async delete(id) {
    try {
      return await prisma.exam.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao excluir o exame');
    }
  }
}

export default ExamService;
