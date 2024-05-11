import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DoctorService {
  static async create(data) {
    try {
      return await prisma.doctor.create({ data: data });  
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar os médicos");
    }
  }

  static async findMany(data) {
    try {
      return await prisma.doctor.findMany();
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao buscar todos os médicos");
    }
  }

  static async findUnique(id) {
    try {
      return await prisma.doctor.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao buscar o médico");
    }
  }

  static async update(id, data) {
    try {
      return await prisma.doctor.update({ where: { id }, data });
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao atualizar o médico");
    }
  }

  static async delete(id) {
    try {
      return await prisma.doctor.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao excluir o médico");
    }
  }
}

export default DoctorService;
