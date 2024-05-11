import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DoctorConfigService {
  static async create(data) {
    console.log("🚀 ~ DoctorConfigService ~ create ~ data:", data);
    try {
      const { doctor_id, ...configData } = data;

      const createdConfig = await prisma.config.create({
        data: {
          ...configData,
          doctor: { connect: { id: doctor_id } },
        },
      });

      return createdConfig;
    } catch (error) {
      console.error('Erro ao criar configuração do médico:', error);
      throw new Error('Erro interno do servidor.');
    }
  }

  static async findMany() {
    try {
      return await prisma.config.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar as configurações dos médicos');
    }
  }

  static async findUnique(id) {
    try {
      return await prisma.doctorConfig.findUnique({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar a configuração do médico');
    }
  }

  static async update(id, data) {
    try {
      return await prisma.doctorConfig.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar a configuração do médico');
    }
  }

  static async delete(id) {
    try {
      return await prisma.doctorConfig.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao excluir a configuração do médico');
    }
  }
}

export default DoctorConfigService;
