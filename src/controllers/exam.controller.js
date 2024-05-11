// exam.controller.js

import ExamService from "../services/exam.service.js";

class ExamController {
  static async create(req, res) {
    try {
      return res.status(201).json(await ExamService.create(req.body));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar o exame" });
    }
  }

  static async findAll(req, res) {
    try {
      const exams = await ExamService.findMany();
      return res.status(200).json(exams);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar os exames" });
    }
  }

  static async findOne(req, res) {
    const { id } = req.params;
    try {
      const exam = await ExamService.findUnique(parseInt(id));
      if (!exam) {
        return res.status(404).json({ error: "Exame não encontrado" });
      }
      return res.status(200).json(exam);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar o exame" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
      const updatedExam = await ExamService.update(parseInt(id), newData);
      return res.status(200).json(updatedExam);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar o exame" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await ExamService.delete(parseInt(id));
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir o exame" });
    }
  }
}

export default ExamController;
