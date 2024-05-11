import DoctorService from "../services/doctor.service.js";

class DoctorController {
  static async create(req, res) {
    try {
      return res.status(201).json(await DoctorService.create(req.body));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar o médico" });
    }
  }

  static async findAll(req, res) {
    try {
      const doctors = await DoctorService.findMany();
      return res.status(200).json(doctors);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar os médicos" });
    }
  }

  static async findOne(req, res) {
    const { id } = req.params;
    try {
      const doctor = await DoctorService.findUnique(parseInt(id));
      if (!doctor) {
        return res.status(404).json({ error: "Médico não encontrado" });
      }
      return res.status(200).json(doctor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar o médico" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    console.log(req.params);
    console.log(req.params);
    console.log(req.params);
    console.log(req.params);
    const newData = req.body;
    try {
      const updatedDoctor = await DoctorService.update(parseInt(id), newData);
      return res.status(200).json(updatedDoctor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar o médico" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await DoctorService.delete(parseInt(id));
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir o médico" });
    }
  }
}

export default DoctorController;
