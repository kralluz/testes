import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DoctorConfigService {
  static async create(data) {
    const { doctorId, apptsPerHour, startIntervalTime, endIntervalTime, startTime, endTime } = data;

    try {
  
      const createdConfig = await prisma.config.create({
        data: {
          doctor: { connect: { id: doctorId } },
          appts_per_hour: apptsPerHour,
          start_interval_time: startIntervalTime,
          end_interval_time: endIntervalTime,
          start_time: startTime,
          end_time: endTime,
        },
      });
  
      return createdConfig;
    } catch (error) {
      console.error('Erro ao criar configuração do médico:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  static async findMany() {
    try {
      return await prisma.doctorConfig.findMany();
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
