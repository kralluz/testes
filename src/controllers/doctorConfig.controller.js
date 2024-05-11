import DoctorConfigService from '../services/doctorConfig.service.js';


class DoctorConfigController {
  static async create(req, res) {
    try {
      const doctorConfig = await DoctorConfigService.create(req.body);
      return res.status(201).json(doctorConfig);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao criar a configuração do médico" });
    }
  }

  static async findAll(req, res) {
    try {
      return res.status(200).json(await DoctorConfigService.findMany());
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar as configurações dos médicos" });
    }
  }

  static async findOne(req, res) {
    const { id } = req.params;
    try {
      const doctorConfig = await DoctorConfigService.findUnique(parseInt(id));
      if (!doctorConfig) {
        return res
          .status(404)
          .json({ error: "Configuração do médico não encontrada" });
      }
      return res.status(200).json(doctorConfig);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar a configuração do médico" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
      const updatedDoctorConfig = await DoctorConfigService.update(
        parseInt(id),
        newData
      );
      return res.status(200).json(updatedDoctorConfig);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar a configuração do médico" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await DoctorConfigService.delete(parseInt(id));
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao excluir a configuração do médico" });
    }
  }
}

export default DoctorConfigController;
